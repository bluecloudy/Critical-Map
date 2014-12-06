<?php
require_once 'vendor/autoload.php';
require_once 'config.php';
require_once 'JWSMiddleware.php';
/**
 * @var $entityManager Doctrine\ORM\EntityManager
 */
use JMS\Serializer\SerializerBuilder;
use JMS\Serializer\SerializationContext;

$serializer = SerializerBuilder::create()->build();

// Create app
$app = new \Slim\Slim();
// Add middleware to check access
$middleWare = new JWSMiddleware();
$middleWare->exclude('/authenticate');
$middleWare->exclude('/register');
$middleWare->exclude('/location');
$middleWare->exclude('/locations');

$app->add($middleWare);

# BEGIN LOCATION
$app->get('/locations', function () use ($app, $entityManager, $serializer) {
    $locations = $entityManager->getRepository('Location')->findAll();
    $jsonContent = $serializer->serialize($locations, 'json');
    $app->response->write($jsonContent);
});

$app->get('/locations/:id', function ($id) use ($app, $entityManager, $serializer) {
    $locations = $entityManager->getRepository('Location')->find($id);
    $jsonContent = $serializer->serialize($locations, 'json');
    $app->response->write($jsonContent);
});

$app->post('/locations', function () use ($app, $entityManager, $serializer) {
    $title = $app->request->post('title');
    $latitude = $app->request->post('latitude');
    $longitude = $app->request->post('longitude');
    /**
     * todo: upload photo
     */
    $photo = $_FILES['photo'];

    $location = new Location();
    $location->setTitle($title);
    $location->setLatitude($latitude);
    $location->setLongitude($longitude);

    $user =  $user = $entityManager->getRepository('User')->find(1);
    $location->setUser($user);

});

$app->put('/locations:id', function () use ($app, $entityManager, $serializer) {

});


# END LOCATION

$app->get('/users', function () use ($app, $entityManager, $serializer) {
    $users = $entityManager->getRepository('User')->findAll();
    $jsonContent = $serializer->serialize($users, 'json');
    $app->response->write($jsonContent);
});

$app->post('/register', function () use ($app, $entityManager, $serializer) {
    $username = $app->request->post('username');
    $password = $app->request->post('password');

    // Check user exist
    $user = $entityManager->getRepository('User')->findOneBy(array('username' => $username));
    if ($user) {
        $app->response->write(json_encode(array('error' => 'A user already exists with this username. Please select a different name or login.')));
        return;
    }

    $user = new User();
    $user->setUserName($username);
    $user->setPassword($password);

    $entityManager->persist($user);
    $entityManager->flush();

    $jsonContent = $serializer->serialize($user, 'json', SerializationContext::create()->setGroups(array('details')));
    $app->response->write($jsonContent);
});


$app->get('/user/:id', function ($id) use ($app, $entityManager, $serializer) {
    $user = $entityManager->find('User', $id);
    $jsonContent = $serializer->serialize($user, 'json', SerializationContext::create()->setGroups(array('details')));
    $app->response->write($jsonContent);
});

$app->post('/authenticate', function () use ($app, $entityManager, $serializer) {
    $username = $app->request->post('username');
    $password = $app->request->post('password');

    $user = $entityManager->getRepository('User')->findOneBy(array('username' => $username));
    if (!$user) {
        $app->response->write(json_encode(array('error' => 'Wrong user name or password.')));
        return;
    }

    if ($password == $user->getPassword()) {
        $expire = time() + 3600;
        $token = AuthenticateJWS::createToken($user, $expire);
        $app->response->write(json_encode(array('token' => $token, 'token.expired' => $expire)));
    } else {
        $app->response->write(json_encode(array('error' => 'Wrong user name or password.')));
    }

});


$app->run();