<?php
require_once 'vendor/autoload.php';

ini_set('display_errors', 1);
error_reporting(E_ALL);

use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Mapping\Driver\AnnotationDriver;
use Doctrine\Common\Annotations\AnnotationReader;
use Doctrine\Common\Annotations\AnnotationRegistry;

$paths            = array(__DIR__ . '/src');
$isDevMode        = false;
$connectionParams = array(
    'driver' => 'pdo_mysql',
    'user'     => 'root',
    'password' => '123',
    'dbname'   => 'spa'
);

$config = Setup::createConfiguration($isDevMode);
$config->setProxyDir(__DIR__.'/proxy');

$driver = new AnnotationDriver(new AnnotationReader(), $paths);

// registering noop annotation autoloader - allow all annotations by default
AnnotationRegistry::registerLoader('class_exists');
$config->setMetadataDriverImpl($driver);

$entityManager = EntityManager::create($connectionParams, $config);

// Create security key
define('SSL_PRIVATE_KEY_PATH', dirname(__FILE__).'/key/private.key');
define('SSL_PUBLIC_KEY_PATH', dirname(__FILE__).'/key/public.key');

