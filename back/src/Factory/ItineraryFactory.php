<?php

namespace App\Factory;

use App\Entity\Itinerary;
use App\Repository\ItineraryRepository;
use Zenstruck\Foundry\RepositoryProxy;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;

/**
 * @method static Itinerary|Proxy findOrCreate(array $attributes)
 * @method static Itinerary|Proxy random()
 * @method static Itinerary[]|Proxy[] randomSet(int $number)
 * @method static Itinerary[]|Proxy[] randomRange(int $min, int $max)
 * @method static ItineraryRepository|RepositoryProxy repository()
 * @method Itinerary|Proxy create($attributes = [])
 * @method Itinerary[]|Proxy[] createMany(int $number, $attributes = [])
 */
final class ItineraryFactory extends ModelFactory
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
            // ->afterInstantiate(function(Itinerary $itinerary) {})
        ;
    }

    protected static function getClass(): string
    {
        return Itinerary::class;
    }
}
