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
 * @ORM\Entity @ORM\Table(name="locations")
 */
class Location {
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
    protected $title;
    /**
     * @ORM\Column(type="string")
     * @var string
     * @Groups({"list", "details"})
     */
    protected $latitude;
    /**
     * @ORM\Column(type="string")
     * @var string
     * @Groups({"list", "details"})
     */
    protected $longitude;
    /**
     * @ORM\Column(type="string")
     * @var string
     * @Groups({"list", "details"})
     */
    protected $level;
    /**
     * @ORM\Column(type="integer")
     * @var integer
     * @Groups({"list", "details"})
     */
    protected $created;

    /**
     * @ORM\ManyToOne(targetEntity="User", inversedBy="locations")
     * @Groups({"list", "details"})
     **/
    protected $user;

    public function getId()
    {
        return $this->id;
    }

    public function getTitle()
    {
        return $this->title;
    }

    public function setTitle($title)
    {
        $this->title = $title;
    }

    public function getLatitude()
    {
        return $this->latitude;
    }

    public function setLatitude($latitude)
    {
        $this->latitude = $latitude;
    }
    public function getLongitude()
    {
        return $this->longitude;
    }

    public function setLongitude($longitude)
    {
        $this->longitude = $longitude;
    }

    public function getCreated()
    {
        return $this->created;
    }

    public function setCreated($created = null)
    {
        $this->created = $created ? $created : time();
    }

    public function setUser($user)
    {
        $user->addLocation($this);
        $this->user = $user;
    }

    public function getReporter()
    {
        return $this->user;
    }

} 