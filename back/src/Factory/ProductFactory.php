<?php

namespace App\Factory;

use App\Entity\Product;
use App\Repository\ProductRepository;
use Zenstruck\Foundry\RepositoryProxy;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;

/**
 * @method static Product|Proxy findOrCreate(array $attributes)
 * @method static Product|Proxy random()
 * @method static Product[]|Proxy[] randomSet(int $number)
 * @method static Product[]|Proxy[] randomRange(int $min, int $max)
 * @method static ProductRepository|RepositoryProxy repository()
 * @method Product|Proxy create($attributes = [])
 * @method Product[]|Proxy[] createMany(int $number, $attributes = [])
 */
final class ProductFactory extends ModelFactory
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

            'name' => self::faker()->name,
            'price' => self::faker()->randomFloat(2,0, 100),
            'description' => self::faker()->text(50),
            'image' => self::faker()->imageUrl()
        ];
    }

    protected function initialize(): self
    {
        // see https://github.com/zenstruck/foundry#initialization
        return $this
            // ->afterInstantiate(function(Product $product) {})
        ;
    }

    protected static function getClass(): string
    {
        return Product::class;
    }
}
