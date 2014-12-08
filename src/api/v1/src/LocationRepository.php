<?php
// src/BugRepository.php

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query;

class LocationRepository extends EntityRepository
{

    public function getNearByLocations($lat, $lng, $radius)
    {

        $config = $this->getEntityManager()->getConfiguration();
        $config->addCustomNumericFunction('DEGREES', 'DoctrineExtensions\Query\Mysql\Degrees');
        $config->addCustomNumericFunction('ACOS', 'DoctrineExtensions\Query\Mysql\Acos');
        $config->addCustomNumericFunction('COS', 'DoctrineExtensions\Query\Mysql\Cos');
        $config->addCustomNumericFunction('Radians', 'DoctrineExtensions\Query\Mysql\Radians');
        $config->addCustomNumericFunction('Sin', 'DoctrineExtensions\Query\Mysql\Sin');

        $qb = $this->createQueryBuilder('l')
            ->select('l.id','l.title', 'l.latitude', 'l.longitude', 'l.created', 'l.level', 'u.username AS user')
//            ->from('Location', 'l')
            ->addSelect(
                '( 3959 * acos(cos(radians(' . $lat . '))' .
                '* cos( radians( l.latitude ) )' .
                '* cos( radians( l.longitude )' .
                '- radians(' . $lng . ') )' .
                '+ sin( radians(' . $lat . ') )' .
                '* sin( radians( l.latitude ) ) ) ) as distance'
            )
            ->leftJoin('l.user', 'u')
//            ->andWhere('l.enabled = :enabled')
//            ->setParameter('enabled', 1)
            ->having('distance <= :distance')
            ->setParameter('distance', $radius)
            ->orderBy('distance', 'ASC');

        $q = $qb->getQuery();

        return $q->execute();
    }
}