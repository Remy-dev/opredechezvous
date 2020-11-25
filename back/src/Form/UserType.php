<?php

namespace App\Form;

use App\Entity\User;
use Doctrine\DBAL\Types\BooleanType;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class UserType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('username', TextType::class)
            ->add('password', PasswordType::class)
            ->add('firstname', TextType::class)
            ->add('lastname', TextType::class)
            ->add('email', EmailType::class)
            ->add('phone', TextType::class)
            ->add('producer')
            ->add('image', TextType::class)
            ->add('updated_at', DateTimeType::HTML5_FORMAT)
            ->add('created_at', DateTimeType::HTML5_FORMAT)
            ->add('emailPro', EmailType::class)
            ->add('phonePro', TextType::class)
            ->add('websitePro', TextType::class)
            ->add('imagePro', TextType::class)
            ->add('descriptionPro', TextType::class)
            ->add('siretPro', TextType::class)
            ->add('companyPro', TextType::class)
            ->add('description', TextType::class)
            ->add('active')
            ->add('itineraries', TextType::class)
            ->add('tags', TextType::class)
            ->add('role', EntityType::class)
            ->add('discussions', EntityType::class)
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}
