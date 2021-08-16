Those files were generated, to prevent multiple versions of global logic.

in the mirroring flow combined with sets strategy (encapsulate logic similar that the mode of traits works on php) there is a issue in the last steps.
here a graphic inheritance


  -base "component set" level (layer 1)
    method1
    method2

  -base "component set" level (layer 2)
    method1
    method2

  -base "component set" level (layer 3)
    method1
    method2

------------------------

  -some new base "crud action component" (layer 1)
    required
      base "component set" level (layer 1)

  -some new base "crud action component" (layer 2)
    required
      some new base "crud action component" (layer 1)
      base "component set" level (layer 2)

  -some new base "crud action component" (layer 3)
    required
      some new base "crud action component" (layer 2)
      base "component set" level (layer 3)


So we have 3 layers of "component set", and also 3 layers of "action component", where "action component", require to have a dinamic merge of old self version + new "component set" version, but the problem is that we need to reuse some methods of "action component set" v2, that was rewrited by "component set " v3

*situation in layer 1 (crudvuel)

  component set level 1 defines
    method1
    method2

  some new base "crud action component" (layer 1) redefines his own method2
    method2

So here the final method2 implementations will be the defined by "crud action component" 1


*situation in layer 2 (custom-crudvuel)

  component set level 2 redefines
    method1
    method2

  some new base "crud action component" (layer 2) defines his own method2
    method2

So here the final method2 implementations will be the defined by "crud action component" 2


*situation in layer 3 (final)

  component set level 3 redefines
    method1
    method2

  some new base "crud action component" (layer 3) defines his own method3
    method3

So here the final method2 implementations will be the defined by "crud action component" 3

overhere all was good, but the problem comes because, some methods of "component set", dont really change since v1, and we dont need to change the "crud action component" since v2, so the way that mixing works, generate here a problem, because we cant just select witch version to use as final (this problem was fixed in vue3),

When we declare "crud action component" v3, we want to mix "component set v3", but without rewrite "crud action component" method 2, but because we cant specify that on mixing, then we need to redeclare the same code from  "crud action component" v2, in "crud action component" v3.

but this "crud action component" v3 method2 is not really some specific implementation for the proyect, is the old "crud action component" v2 method 2 implementation, that is a more generic implementation that we need for all the proyects sharing the pachacke crudvuel, so what happend is that when we need to add some extra behavior to this generic code, we need to put direct in proyect code, that means, update all the proyects manually one by one.

to prevent that, this new folder was created, so here create a way to reload some v2 method 2 definitions, without disabling the inheritance level 3
