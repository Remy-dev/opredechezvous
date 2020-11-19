<?php

namespace App\Factory;

use App\Entity\Admin;
use App\Repository\AdminRepository;
use Zenstruck\Foundry\RepositoryProxy;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;

/**
 * @method static Admin|Proxy findOrCreate(array $attributes)
 * @method static Admin|Proxy random()
 * @method static Admin[]|Proxy[] randomSet(int $number)
 * @method static Admin[]|Proxy[] randomRange(int $min, int $max)
 * @method static AdminRepository|RepositoryProxy repository()
 * @method Admin|Proxy create($attributes = [])
 * @method Admin[]|Proxy[] createMany(int $number, $attributes = [])
 */
final class AdminFactory extends ModelFactory
{
    public function __construct()
    {
        parent::__construct();

        // TODO inject services if required (https://github.com/zenstruck/foundry#factories-as-services)
    }

    protected function getDefaults(): array
    {
        return [
            // TODO add your default values here (https://github.com/zenstruck/foundry#model-factories)
        ];
    }

    protected function initialize(): self
    {
        // see https://github.com/zenstruck/foundry#initialization
        return $this
            // ->afterInstantiate(function(Admin $admin) {})
        ;
    }

    protected static function getClass(): string
    {
        return Admin::class;
    }
}
