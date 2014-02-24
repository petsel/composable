

//basePath = ".";


files = [

  JASMINE,
  JASMINE_ADAPTER,


// load test candidate(s)
// load test candidate(s)

  // composable :: core :: MANDATORY                                                                                  //  Core
  "src/composable.js",                                                                                                //  Core

  // composable :: core :: MANDATORY - heavily used core type detection methods                                       //  Core :: Introspection
  "src/components/Introspective/Introspective.isFunction-isCallable.js",                                              //  Core :: Introspection
  "src/components/Introspective/Introspective.isArray-isArguments.js",                                                //  Core :: Introspection

  // composable :: core :: MANDATORY - so far most reliable [Enumerable.toArray] / [makeArray] implementation         //  Core :: Enumerable
  "src/components/Enumerable/Enumerable.toArray.js",                                                                  //  Core :: Enumerable

  // composable :: core :: MANDATORY - internal base environment that gets passed into all modules                    //  Core :: Base Environment
  "src/environment/environment.js",                                                                                   //  Core :: Base Environment



  // composable :: STRONGLY RECOMMENDED :: fundamental tools - reliable language core TYPE DETECTION BASE             //  Introspection
  "src/components/Introspective/Introspective.typeDetection.core.js",                                                 //  Introspection
  "src/environment/environment.extended.introspective.core.js",                                                       //  Introspection


  // composable :: RECOMMENDED BUT ONLY if one relies on testing for empty values, types and structures               //  Introspection
  "src/components/Introspective/Introspective.type.emptiness.js",                                                     //  Introspection
  "src/environment/environment.extended.introspective.emptiness.js",                                                  //  Introspection
  "src/composites/Array/Array.isSparse.js",                                                                           //  Introspection
  "src/composites/Object/Object.isEmpty.js",                                                                          //  Introspection

  // composable :: RECOMMENDED BUT ONLY if one relies on testing for same values                                      //  Introspection
  "src/components/Introspective/Introspective.type.sameness.js",                                                      //  Introspection
  "src/environment/environment.extended.introspective.sameness.js",                                                   //  Introspection
  "src/composites/Object/Object.is.js",                                                                               //  Introspection

  // composable :: RECOMMENDED BUT ONLY if one relies on testing for equal types                                      //  Introspection
  "src/components/Introspective/Introspective.type.equality.js",                                                      //  Introspection
  "src/environment/environment.extended.introspective.equality.js",                                                   //  Introspection
  "src/composites/Object/Object.isEqual.js",                                                                          //  Introspection


  // composable :: NOT REALLY NECESSARY :: nice to have tools - testing for properties                                //  Introspection
  "src/components/Introspective/Introspective.isAssigned.js",                                                         //  Introspection
  "src/components/Introspective/Introspective.respondTo.js",                                                          //  Introspection
  "src/composites/Object/Object.respondTo-isAssigned.js",                                                             //  Introspection


  // composable :: RECOMMENDED for custom comparison :: elegant flexible customizable type comparison patterns base   //  Comparison
  "src/components/Comparable/Comparable.js",                                                                          //  Comparison


  // composable :: RECOMMENDED for better generic list handling :: useful additional enumerable behaviors             //  Enumerable
  "src/components/Enumerable/Enumerable.first-last.js",                                                               //  Enumerable
  "src/components/Enumerable/Enumerable.first-last-item.js",                                                          //  Enumerable
  "src/components/Enumerable/Enumerable.first-last-item.list-wrapper.js",                                             //  Enumerable
  "src/components/Enumerable/Enumerable.first-last-item.list-getter-shorthands.js",                                   //  Enumerable

  // composable :: RECOMMENDED for better handling of native Array's :: useful additional enumerable behaviors        //  Enumerable
  "src/composites/Array/Array.isArray-isArguments.js",                                                                //  Enumerable
  "src/composites/Array/Array.from.js",                                                                               //  Enumerable
  "src/composites/Array/Array.first-last.js",                                                                         //  Enumerable


  // composable :: RECOMMENDED for custom collection types that encapsulate lists that need to be exposed again       //  Allocable
  "src/components/Allocable/Allocable.js",                                                                            //  Allocable
  "src/components/Allocable/Allocable.all.js",                                                                        //  Allocable
  "src/components/Allocable/Allocable.all.removeItem.js",                                                             //  Allocable


  // composable :: STRONGLY RECOMMENDED if one needs to rely on a type safe event systems                             //  Observable
  "src/components/Observable/Observable.SignalsAndSlots.js",                                                          //  Observable

  // composable :: SPECIAL CASE ONLY :: e.g. one has to augment custom event objects in order to make them propagable //  Propagable EventAdapter
  // composable :: RECOMMENDED if one needs to augment the [Observable] implementation with propagating events        //  Propagable EventAdapter
  "src/components/Propagable/Propagable.EventAdapter.js",                                                             //  Propagable EventAdapter


  // composable :: STRONGLY RECOMMENDED if one needs an AOP inspired pre stage for method modification/modifying      //  Controllable
  "src/components/Controllable/Controllable.adviceTypes.before-after-around.js",                                      //  Controllable
  "src/components/Controllable/Controllable.adviceTypes.afterThrowing-afterFinally.js",                               //  Controllable
  "src/composites/Function/Function.modifiers.adviceTypes.before-after-around.js",                                    //  Controllable
  "src/composites/Function/Function.modifiers.adviceTypes.afterThrowing-afterFinally.js",                             //  Controllable


  // composable :: RECOMMENDED if one is in need of [Queue]s that e.g. do dispatch "enqueue" / "dequeue" events       //  Factory: Queue Type composite
  "src/composites/Queue/QueueFactory.js",                                                                             //  Factory: Queue Type composite
  "src/composites/Queue/QueueFactory.isQueue.js",                                                                     //  Factory: Queue Type composite
  "src/composites/Queue/QueueFactory.Allocable.js",                                                                   //  Factory: Queue Type composite
  "src/composites/Queue/QueueFactory.Allocable.isQueue.js",                                                           //  Factory: Queue Type composite


  // composable :: RECOMMENDED if one is in need of a factory that creates customized [Comparable] Traits             //  Factory: custom Comparable Trait
  "src/entities/Comparable/ComparableFactory.js",                                                                     //  Factory: custom Comparable Trait

  // composable :: RECOMMENDED if one is in need of a factory that creates customized [Iterable] Traits               //  Factory: custom Iterable Trait
  "src/entities/Iterable/IterableFactory.js",                                                                         //  Factory: custom Iterable Trait


  // composable :: NOT REALLY NECESSARY :: unless one likes iterating over INT like numbers by [next] and [previous]  //  Iterable Integer
  "src/components/Iterable/Iterable.Integer.next.js",                                                                 //  Iterable Integer
  "src/components/Iterable/Iterable.Integer.next-previous.js",                                                        //  Iterable Integer
  "src/components/Iterable/Iterable.Integer.next-previous.StopIteration.js",                                          //  Iterable Integer


  // composable :: NOT REALLY NECESSARY :: unless one likes iterating over CHAR like strings by [next] and [previous] //  Iterable Character
  "src/components/Iterable/Iterable.Character.next.js",                                                               //  Iterable Character
  "src/components/Iterable/Iterable.Character.next-previous.js",                                                      //  Iterable Character
  "src/components/Iterable/Iterable.Character.next-previous.StopIteration.js",                                        //  Iterable Character


  // @TODO - NEEDS TO BE ENTIRELY TESTED
  // composable :: RECOMMENDED if one is in need of [DataNode]s in order to build custom event dispatching models     //  Factory: DataNode Type composite
  "src/composites/DataNode/DataNodeFactory.js",                                                                       //  Factory: DataNode Type composite


  // composable :: RECOMMENDED if one needs to save (sub) data structures of custom models into the [localStorage]    //  LocallyStorable
  "src/components/LocallyStorable/LocallyStorable.js",                                                                //  LocallyStorable



// load your spec files
// load your spec files

//"src/**/*.js",
  "test/**/*.js"

/**
 *
 *  // composable :: core :: MANDATORY -->                                                                            //  Core
 *  composable.core.spec                                                                                              //  Core
 *
 *  // composable :: core :: MANDATORY - heavily used core type detection methods                                     //  Core :: Introspection
 *  composable.components.Introspective_isFunction_isCallable.spec                                                    //  Core :: Introspection
 *  composable.components.Introspective_isArray_isArguments.spec                                                      //  Core :: Introspection
 *
 *  // composable :: core :: MANDATORY - internal base environment that gets passed into all modules                  //  Core :: Base Environment
 *  composable.environment.base.spec                                                                                  //  Core :: Base Environment
 *
 *
 *
 *  // composable :: STRONGLY RECOMMENDED :: fundamental tools - reliable language core TYPE DETECTION BASE           //  Introspection
 *  composable.environment.extended.introspective.core.spec                                                           //  Introspection
 *
 *
 *  // composable :: RECOMMENDED BUT ONLY if one relies on testing for empty values, types and structures             //  Introspection
 *  composable.components.Introspective_type_emptiness.spec                                                           //  Introspection
 *  composable.environment.extended.introspective.emptiness.spec                                                      //  Introspection
 *  composable.composites.Array_isSparse.spec                                                                         //  Introspection
 *  composable.composites.Object_isEmpty.spec                                                                         //  Introspection
 *
 *  // composable :: RECOMMENDED BUT ONLY if one relies on testing for same values                                    //  Introspection
 *  composable.components.Introspective_type_sameness.spec                                                            //  Introspection
 *  composable.environment.extended.introspective.sameness.spec                                                       //  Introspection
 *  composable.composites.Object_is.spec                                                                              //  Introspection
 *
 *  // composable :: RECOMMENDED BUT ONLY if one relies on testing for equal types                                    //  Introspection
 *  composable.components.Introspective_type_equality.spec                                                            //  Introspection
 *  composable.environment.extended.introspective.equality.spec                                                       //  Introspection
 *  composable.composites.Object_isEqual.spec                                                                         //  Introspection
 *
 *
 *  // composable :: NOT REALLY NECESSARY :: nice to have tools - testing for properties                              //  Introspection
 *  composable.components.Introspective_isAssigned.spec                                                               //  Introspection
 *  composable.components.Introspective_respondTo.spec                                                                //  Introspection
 *  composable.composites.Object_respondTo_isAssigned.spec                                                            //  Introspection
 *
 *
 *  // composable :: RECOMMENDED for custom comparison :: elegant flexible customizable type comparison patterns base //  Comparison
 *  composable.components.Comparable.spec                                                                             //  Comparison
 *
 *
 *  // composable :: core :: MANDATORY - so far most reliable [Enumerable.toArray] / [makeArray] implementation       //  Core :: Enumerable
 *  composable.components.Enumerable_toArray.spec                                                                     //  Core :: Enumerable
 *
 *
 *  // composable :: RECOMMENDED for better generic list handling :: useful additional enumerable behaviors           //  Enumerable
 *  composable.components.Enumerable_first_last_item.spec                                                             //  Enumerable
 *  composable.components.Enumerable_first_last_item_listWrapper.spec                                                 //  Enumerable
 *  composable.components.Enumerable_first_last_item.listGetterShorthands.spec                                        //  Enumerable
 *
 *  // composable :: RECOMMENDED for better handling of native Array's :: useful additional enumerable behaviors      //  Enumerable
 *  composable.composites.Array_isArray_isArguments.spec                                                              //  Enumerable
 *  composable.composites.Array_from.spec                                                                             //  Enumerable
 *  composable.composites.Array_first_last.spec                                                                       //  Enumerable
 *
 *
 *  // composable :: RECOMMENDED for custom collection types that encapsulate lists that need to be exposed again     //  Allocable
 *  composable.components.Allocable.spec                                                                              //  Allocable
 *  composable.components.Allocable_all.spec                                                                          //  Allocable
 *  composable.components.Allocable_all_removeItem.spec                                                               //  Allocable
 *
 *
 *  // composable :: STRONGLY RECOMMENDED if one needs to rely on a type safe event systems                           //  Observable
 *  composable.components.Observable_SignalsAndSlots.spec                                                             //  Observable
 *
 *  // composable :: SPECIAL CASE ONLY :: e.g. one has to augment custom event objects in order to make them propagable //  Propagable EventAdapter
 *  // composable :: RECOMMENDED if one needs to augment the [Observable] implementation with propagating events        //  Propagable EventAdapter
 *  composable.components.Propagable_EventAdapter.spec                                                                  //  Propagable EventAdapter
 *
 *
 *  // composable :: STRONGLY RECOMMENDED if one needs an AOP inspired pre stage for method modification/modifying    //  Controllable
 *  composable.components.Controllable_adviceTypes_before_after_around.spec                                           //  Controllable
 *  composable.components.Controllable_adviceTypes_afterThrowing_afterFinally.spec                                    //  Controllable
 *  composable.composites.Function_modifiers_adviceTypes_before_after_around.spec                                     //  Controllable
 *  composable.composites.Function_modifiers_adviceTypes_afterThrowing_afterFinally.spec                              //  Controllable
 *
 *
 *  // composable :: RECOMMENDED if one is in need of [Queue]s that e.g. do dispatch "enqueue" / "dequeue" events     //  Factory: Queue Type composite
 *  composable.composites.QueueFactory.spec                                                                           //  Factory: Queue Type composite
 *  composable.composites.QueueFactory_isQueue.spec                                                                   //  Factory: Queue Type composite
 *  composable.composites.QueueFactory_Allocable.spec                                                                 //  Factory: Queue Type composite
 *  composable.composites.QueueFactory_Allocable_isQueue.spec                                                         //  Factory: Queue Type composite
 *
 *
 *  // composable :: RECOMMENDED if one is in need of a factory that creates customized [Comparable] Traits           //  Factory: custom Comparable Trait
 *  composable.entities.ComparableFactory.spec                                                                        //  Factory: custom Comparable Trait
 *
 *  // composable :: RECOMMENDED if one is in need of a factory that creates customized [Iterable] Traits             //  Factory: custom Iterable Trait
 *  composable.entities.IterableFactory.spec                                                                          //  Factory: custom Iterable Trait
 *
 *
 *  // composable :: NOT REALLY NECESSARY :: unless one likes iterating over INT like numbers by [next] and [previous]//  Iterable Integer
 *  composable.components.Iterable_Integer_next.spec                                                                  //  Iterable Integer
 *  composable.components.Iterable_Integer_next_previous.spec                                                         //  Iterable Integer
 *  composable.components.Iterable_Integer_next_previous_StopIteration.spec                                           //  Iterable Integer
 *
 *  // composable :: NOT REALLY NECESSARY :: unless one likes iterating over CHAR like strings by [next] 'n [previous]//  Iterable Character
 *  composable.components.Iterable_Character_next.spec                                                                //  Iterable Character
 *  composable.components.Iterable_Character_next_previous.spec                                                       //  Iterable Character
 *  composable.components.Iterable_Character_next_previous_StopIteration.spec                                         //  Iterable Character
 *
 *
 *  // @TODO - NEEDS TO BE ENTIRELY TESTED
 *  // composable :: RECOMMENDED if one is in need of [DataNode]s in order to build custom event dispatching models   //  Factory: DataNode Type composite
 *  composable.composites.DataNodeFactory.spec                                                                        //  Factory: DataNode Type composite
 *
 *
 *  // composable :: RECOMMENDED if one needs to save (sub) data structures of custom models into the [localStorage]  //  LocallyStorable
 *  composable.components.LocallyStorable.spec                                                                        //  LocallyStorable
 *
 *
 */

];

autoWatch = true;

browsers = [
  "Firefox",
  "Safari",   // fails for "/test/specs/composable.components.Iterable_Integer_next.spec.js" for lines 41,42 and 44.
  "Chrome",
  "PhantomJS"
];


reporters = [
  "dots"
];
