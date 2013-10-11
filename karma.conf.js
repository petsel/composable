

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


  // composable :: STRONGLY RECOMMENDED if one needs an AOP inspired pre stage for method modification/modifying      //  Controllable
  "src/components/Controllable/Controllable.adviceTypes.before-after-around.js",                                      //  Controllable
  "src/components/Controllable/Controllable.adviceTypes.afterThrowing-afterFinally.js",                               //  Controllable
  "src/composites/Function/Function.modifiers.adviceTypes.before-after-around.js",                                    //  Controllable
  "src/composites/Function/Function.modifiers.adviceTypes.afterThrowing-afterFinally.js",                             //  Controllable


  // composable :: RECOMMENDED if one is in need of [Queue]s that e.g. do dispatch "enqueue" / "dequeue" events       //  QueueFactory composites
  "src/composites/Queue/QueueFactory.js",                                                                             //  QueueFactory composites
  "src/composites/Queue/QueueFactory.isQueue.js",                                                                     //  QueueFactory composites
  "src/composites/Queue/QueueFactory.Allocable.js",                                                                   //  QueueFactory composites
  "src/composites/Queue/QueueFactory.Allocable.isQueue.js",                                                           //  QueueFactory composites



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
 *  // composable :: STRONGLY RECOMMENDED :: fundamental tools - reliable language core TYPE DETECTION BASE           //  Introspection
 *  composable.environment.extended.introspective.core.spec                                                           //  Introspection
 *
 *  // composable :: NOT REALLY NECESSARY :: nice to have tools - testing for properties                              //  Introspection
 *  composable.components.Introspective_isAssigned.spec                                                               //  Introspection
 *  composable.components.Introspective_respondTo.spec                                                                //  Introspection
 *  composable.composites.Object_respondTo_isAssigned.spec                                                            //  Introspection
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
 *
 *  // composable :: RECOMMENDED for custom collection types that encapsulate lists that need to be exposed again     //  Allocable
 *  composable.components.Allocable.spec                                                                              //  Allocable
 *  composable.components.Allocable_all.spec                                                                          //  Allocable
 *  composable.components.Allocable_all_removeItem.spec                                                               //  Allocable
 *
 *  // composable :: STRONGLY RECOMMENDED if one needs to rely on a type safe event systems                           //  Observable
 *  composable.components.Observable_SignalsAndSlots.spec                                                             //  Observable
 *
 *  // composable :: STRONGLY RECOMMENDED if one needs an AOP inspired pre stage for method modification/modifying    //  Controllable
 *  composable.components.Controllable_adviceTypes_before_after_around.spec                                           //  Controllable
 *  composable.components.Controllable_adviceTypes_afterThrowing_afterFinally.spec                                    //  Controllable
 *  composable.composites.Function_modifiers_adviceTypes_before_after_around.spec                                     //  Controllable
 *  composable.composites.Function_modifiers_adviceTypes_afterThrowing_afterFinally.spec                              //  Controllable
 *
 *  // composable :: RECOMMENDED if one is in need of [Queue]s that e.g. do dispatch "enqueue" / "dequeue" events     //  QueueFactory composite
 *  composable.composites.QueueFactory.spec                                                                           //  QueueFactory composite
 *  composable.composites.QueueFactory_isQueue.spec                                                                   //  QueueFactory composite
 *  composable.composites.QueueFactory_Allocable.spec                                                                 //  QueueFactory composite
 *  composable.composites.QueueFactory_Allocable_isQueue.spec                                                         //  QueueFactory composite
 */

];


autoWatch = true;

browsers = [
//"Firefox",
//"Safari",
  "Chrome",
  "PhantomJS"
];


reporters = [
  "dots"
];
