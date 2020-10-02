<?php

namespace App\DataFixtures;

use App\Entity\Address;
use App\Entity\Comment;
use App\Entity\Itinerary;
use App\Entity\Message;
use App\Entity\Product;
use App\Entity\Tag;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use App\Entity\Role;
class AppFixtures extends Fixture
{
    private $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    public function load(ObjectManager $manager)
    {
        $faker = Faker\Factory::create();
        // $product = new Product();
        // $manager->persist($product);
        $roles = [
            'admin' => 'Administrateur',
            'moderator' => 'Modérateur',
            'producer' => 'Producteur',
            'user' => 'Utilisateur',
        ];

        // Users : seront créés en dur pour pouvoir les manipuler en attendant le module de sécurité
        $userGroup = array(
            'admin' => ['blandine', 'raphael', 'maureen', 'ryme', 'thomas'],
            'moderator' => ['john', 'jeanette', 'sol', 'lamia', 'martin'],
            'producer' => ['jean', 'claude'],
            'user' => ['remy', 'roland', 'marc'],
        );
        $usersEntities = array();

        foreach ($userGroup as $roleGroup => $users) {
            // Role
            $role = new Role();
            $role->setRoleName('ROLE_'. mb_strtoupper($roleGroup));
            $role->setName($roles[$roleGroup]);


            foreach ($users as $u) {
                // New user based on list

                $user = new User;
                $user->setUsername($u);
                $user->setPassword($this->encoder->encodePassword($user, $u)); // Le mot de passe est le nom de l'utilisateur
                $user->setFirstname($faker->firstName);
                $user->setLastname($faker->lastName);
                $user->setPhone($faker->randomNumber());

                // unset($roles);
                $user->setProducer($faker->boolean);
                $user->setImage($faker->imageUrl());
                $user->setRole($role);
                $manager->persist($role);




                $user->setEmail($u . '@p-regionaux.oclock.io');

                // Add it to the list of entities
                $usersEntities[] = $user;
                // Persist
                $manager->persist($user);

                print 'Adding user ' . $user->getUsername() . PHP_EOL;

                $address = new Address();
                $address->setUser($user);
                $address->setStreetNumber($faker->buildingNumber);
                $address->setStreetName($faker->streetName);
                $address->setType('boulevard');
                $address->setCity($faker->city);
                $address->setPostCode((int)$faker->postcode);
                $address->setCountry($faker->country);

                $manager->persist($address);

                $itinerary = new Itinerary();
                $itinerary->setDepartureAddress($faker->city);
                $itinerary->setArrivalAddress($faker->city);
                $itinerary->setDateDeparture($faker->dateTime('now'));
                $itinerary->setDateArrival($faker->dateTimeBetween('now', '+1 day'));
                $itinerary->addUser($user);


                $manager->persist($itinerary);

                $comment = new Comment();
                $comment->setTitle($faker->title);
                $comment->setContent($faker->text);
                $comment->setRating($faker->randomNumber(1));
                $comment->setState('published');
                $comment->setAuthor($user);
                $comment->setAddressee($user);
                $manager->persist($comment);

                for ($t = 0; $t < 4; $t++) {
                    $message = new Message();

                    $message->setContent($faker->text);
                    $message->setAuthor($user);
                    $message->setAddressee($user);
                    $manager->persist($message);
                }
                if ($user->isProducer()) {
                    for ($z = 0; $z < 5; $z++) {
                        $user->setCompanyPro($faker->company);
                        $user->setDescriptionPro($faker->text);
                        $user->setEmailPro($faker->email);
                        $user->setImagePro($faker->imageUrl());
                        $user->setSiretPro($faker->iban());
                        $user->setWebsitePro($faker->url);
                        $user->setPhonePro($faker->randomNumber());
                        $user->getRole()->setRoleName('ROLE_PRODUCER');
                        $product = new Product();
                        $product->setName($faker->word);
                        $product->setDescription($faker->text);
                        $product->setPrice($faker->randomFloat());
                        $product->setImage($faker->imageUrl());
                        $product->setUser($user);

                        $manager->persist($product);
                    }
                    for ($e = 0; $e < 5; $e++) {
                        $tag = new Tag();
                        $tag->setName($faker->word);
                        $user->addTag($tag);
                        $manager->persist($tag);
                    }


                }
            }
            $manager->flush();
        }
    }
}
