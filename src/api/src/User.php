<?php
/**
 * Created by PhpStorm.
 * User: giangnguyen
 * Date: 6/10/14
 * Time: 11:29 PM
 */
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\SerializedName;
use JMS\Serializer\Annotation\Groups;

/**
 * @ORM\Entity @ORM\Table(name="users")
 */
class User {
    /**
     * @ORM\Id @ORM\GeneratedValue @ORM\Column(type="integer")
     * @var int
     * @Groups({"list", "details"})
     */
    protected $id;
    /**
     * @ORM\Column(type="string")
     * @var string
     * @Groups({"list", "details"})
     */
    protected $username;
    /**
     * @ORM\Column(type="string")
     * @var string
     */
    protected $password;

    /**
     * @ORM\OneToMany(targetEntity="Location", mappedBy="user")
     * @var Location[]
     **/
    protected $locations = null;

    public function __construct()
    {
        $this->locations = new ArrayCollection();
    }

    public function getId()
    {
        return $this->id;
    }

    public function getUserName()
    {
        return $this->username;
    }

    public function setUserName($name)
    {
        $this->username = $name;
    }

    public function getPassword()
    {
        return $this->password;
    }

    public function setPassword($password)
    {
        $this->password = $password;
    }

    public function addLocation($location)
    {
        $this->locations[] = $location;
    }
} 