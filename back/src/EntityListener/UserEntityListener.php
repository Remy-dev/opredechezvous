<?php

namespace App\EntityListener;

use App\Entity\Role;
use App\Repository\RoleRepository;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use App\Entity\User;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserEntityListener
{
    private $mailer;
    private $encoder;
    private $repository;

    public function __construct(MailerInterface $mailer, RoleRepository $repository, UserPasswordEncoderInterface $encoder)
    {
        $this->mailer = $mailer;
        $this->repository = $repository;
        $this->encoder = $encoder;
    }

    public function prePersist(User $user, LifecycleEventArgs $event)
    {
        $user->hashPassword($this->encoder);
        // gestion des rôles a l'inscription
        $role = $this->repository->findOneByRoleName('ROLE_USER');

        $user->setRole($role);

        if($user->isProducer())
        {
            $role = $this->repository->findOneByRoleName('ROLE_PRODUCER');
            $user->setRole($role);
        }

       $user->sendMailOnRegistration($this->mailer);

    }

}