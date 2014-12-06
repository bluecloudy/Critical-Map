<?php
/**
 * Created by PhpStorm.
 * User: giangnguyen
 * Date: 6/10/14
 * Time: 11:17 PM
 */

if(!defined('SSL_PRIVATE_KEY_PATH')){
    define('SSL_PRIVATE_KEY_PATH', dirname(__FILE__).'/private.key');
}
if(!defined('SSL_PUBLIC_KEY_PATH')){
    define('SSL_PUBLIC_KEY_PATH', dirname(__FILE__).'/public.key');
}

/**
 * Class AuthenticateJWS
 */
class AuthenticateJWS {

    /**
     * Create access token
     * @param $item
     * @param null $expired
     * @return string
     */
    public static function createToken($item, $expired = null){
        // Check security key
        if(!self::checkSecurityKeys()) {
            self::createSecurityKeys();
        }
        // Force cast item to object
        $object = (array) $item;
        // Add expired time
        if(!$expired) $expired = time() + 3600;
        $object['expired'] = $expired;

        // JOSE_JWT
        $jwt = new JOSE_JWT($object);

        // Sign item with private key
        $private_key = file_get_contents(SSL_PRIVATE_KEY_PATH);
        $jws = $jwt->sign($private_key, 'RS256');

        // Return token string
        return $jws->toString();
    }

    /**
     * Check token
     * @param $token
     * @return $this|bool
     */
    public static function checkToken($token){
        $jwt = JOSE_JWT::decode($token);
        $jws = new JOSE_JWS($jwt);

        if(!isset($jws->claims['expired'])){
            return false;
        }

        // Check token is expired
        if($jws->claims['expired'] < time()){
            return false;
        }

        try{
            $public_key = file_get_contents(SSL_PUBLIC_KEY_PATH);
            return $jws->verify($public_key);
        }catch (Exception $e){
            return false;
        }
    }

    public static function createSecurityKeys(){
        $rsa = new Crypt_RSA();
        extract($rsa->createKey());
        // Write to file
        /**
         * @var $publickey String
         * @var $privatekey String
         */
        file_put_contents(SSL_PUBLIC_KEY_PATH, $publickey);
        file_put_contents(SSL_PRIVATE_KEY_PATH, $privatekey);

        if(!is_file(SSL_PRIVATE_KEY_PATH) || !is_file(SSL_PUBLIC_KEY_PATH)){

        }
    }
    public static function checkSecurityKeys(){
        return is_file(SSL_PRIVATE_KEY_PATH) && is_file(SSL_PUBLIC_KEY_PATH);
    }
}

use JMS\Serializer\SerializerBuilder;
class JWSMiddleware extends \Slim\Middleware
{
    protected $_excludes = array();

    /**
     * @param $reSource
     * @return $this
     */
    public function exclude($reSource){
        if(is_array($reSource)){
            foreach($reSource as $_reSource){
                $this->_excludes[] = $_reSource;
            }
        }else{
            $this->_excludes[] = $reSource;
        }

        return $this;
    }
    /**
     * Call middleware.
     *
     * @return void
     */
    public function call()
    {
        if(in_array($this->app->request->getResourceUri(), $this->_excludes)){
            // Call next middleware.
            $this->next->call();
        }
        else{
            if($this->check()){
                $this->next->call();
            }else{
                $response = $this->app->response();
                $data = array('error' => 'Not authenticated.');
                $serializer = SerializerBuilder::create()->build();
                $jsonContent = $serializer->serialize($data, 'json');
                $response->write($jsonContent);
            }
        }
    }

    /**
     * @return $this|bool
     */
    protected function check(){
        $request = $this->app->request();
        if($request->get('token')){
            return AuthenticateJWS::checkToken($request->get('token'));
        }
        return false;
    }

}