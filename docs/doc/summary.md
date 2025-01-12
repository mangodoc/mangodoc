## Java基础

> [详情请跳转查看](https://mg0324.github.io/s-java/#/java/base)

### 基础数据类型

* boolean - 1字节，值为true或者false.
* byte - 1字节
* short - 2字节
* char - 2字节
* int - 4字节
* long - 8字节
* float - 4字节
* double - 8字节

### 面向对象特性

* 封装 - 将数据和操作封装在对象内部，只暴露必要接口供外部调用。可以提高代码的可用性和安全性，减少代码的耦合度。
* 继承 - 通过继承，子类可以通过父类从父类中继承到父类的属性和方法，并在此基础上增加或修改属性和方法。继承可以是代码更加简洁，易于维护和扩展。
* 多态 - 多态是指同一种操作作用于不同对象，会产生不同的结果。多态可以增加程序的灵活性和扩展性。
* 抽象 - 通过抽象，将具体的实现细节抽象出来，形成一个抽象的概念和接口，以便代码的重用和扩展。
* 接口 - 接口定义一组方法和属性，供外部调用。使代码更加模块化，便于维护和扩展。

### 方法重载（overload)

在一个类中，存在多个相同名字的方法，但是参数列表或者返回值不同的一组方法。

### 方法重写(override)

子类重写父类的方法。

### 泛型

Java中泛型是基于类型擦除实现的，避免在运行时出现强制类型转换错误。

### 异常

Java中异常的基类是 `Throwable`，包括 `Error`和 `Exception`2个子类。`Error`表示严重问题，无法恢复；`Exception`表示异常，可以恢复。可以通过 `try`、`catch`和 `finally`来做异常处理。

## Java集合框架

### 家族成员

* `Collection`接口
  * `List`接口： 可重复集合，实现类有 `ArrayList`和 `LinkedList`，并发实现类有 `Vector`。
  * `Set`接口：不可重复集合，实现类有 `HashSet`和 `TreeSet`，并发实现类有 `ConcurrentHashSet`。
  * `Queue`接口：队列，实现类有 `LinkedList`和 `PriorityQueue`。
  * `Deque`接口：双端队列，实现类有 `LinkedList`和 `ArrayDeque`。
* `Map`接口： hash集合接口，实现类有 `HashMap`、`LinkedHashMap`和 `TreeMap`，并发实现类有 `ConcurrentHashMap`。

### ArrayList底层实现原理

基于数组实现，可动态扩缩容，初始容量为`10`。

添加时，超过数组长度会扩容为原来的`1.5`倍；删除时，数量小于等于数组长度一半时，缩容为原来的`0.75`倍。

优点：基于数组下标访问快。

缺点：添加和删除元素时，可能需要扩缩容或者移动元素，速度较慢。

总结：`ArrayList`多用在读大于写的场景，`LinkedList`多用在写大于读的场景。

### HashMap底层实现原理

一种哈希表的实现，存放键值对，`key`唯一，`value`可重复。

添加(`put`)时，会先根据 `key`的hash值和数组长度取模后得到数组下标：
    若下标上没有值，则直接插入节点；
    若下标上有值，则调用元素值的`equals`方法和原位置上的值做比较，若相等则覆盖写入，若不相等则`尾插法`插入节点到链表。
    如果链表的`长度大于8`且hash表的`长度大于64`时，JDK8会将链表转换为`红黑树`，以提高查询效率；当红黑树元素个数`小于6时`，退化为`链表`，已节省内存。

访问时，会先根据 `key`的hash值和数组长度取模后得到数组下标，然后遍历下标上的链表或者红黑树，找到对应元素的值。

扩容：当元素数量`超过75%`，则扩容为原来的`2倍`，并将数据重新分配到新数组。

缩容：当元素数量`少于25%`，则缩容为原来的`一半`，并将数据重新分配到新数组。

初始容量为`16`，负载因子为`0.75`，最大容量为`2的30次方`。


## IO模型
> 详情请参考[网络通信IO模型](https://mg0324.github.io/s-java/#/rpc/network?id=%e5%87%a0%e7%a7%8d%e5%b8%b8%e7%94%a8%e7%9a%84%e7%bd%91%e7%bb%9c%e6%a8%a1%e5%9e%8b)
* 同步阻塞IO(BIO) - 一个线程处理一个socket读写，如果要实现多连接则需要多线程
* 同步非阻塞IO(NIO) - 一个线程可以处理多个socket读写，轮询处理多个线程
* 多路复用IO - 一个线程可以处理多个socket读写，将多个socket注册到一个复用器上，内核监控复用器中的socket，如果就绪才读取数据，（epoll）可以避免轮询带来的性能损耗。
  * select - 多路复用器，基于`数组`存储socket描述符，线程数量有`上限1024`，内核`轮询`询问是否有事件就绪。
  * poll - 基于`链表`存储socket描述符，数量`无限制`，内核`轮询`询问是否有事件就绪。
  * epoll - 基于`红黑树`存储socket描述符，不再轮询，使用`回调机制`，当某个socket就绪，内核会直接调用回调函数，不再需要轮询。
* 异步非阻塞IO(AIO) - 

同步异步是针对数据读取是用户线程还是内核线程完成，用户线程调用read则是同步，内核调用read则是异步。

阻塞非阻塞时针对调用后是否立即返回，阻塞不会立即返回需要阻塞等待内核完成后才返回，非阻塞则会立即返回。

## Java并发

## JVM

### 类加载机制

加载、链接（验证、准备、解析）、初始化、使用、卸载

### 运行时数据区

线程共享：堆，方法区

线程独享：程序计数器，JVM栈，本地方法栈

### CMS垃圾回收器

> jdk1.5发布的低延迟并发垃圾回收器，适用于老年代，采用分代收集思想。

1. 初始标记（STW）：只标记GC Roots引用到的对象
2. 并发标记：从GC Roots根对象开始做可达性分析，标记能到达的对象
3. 重新标记（STW）：修正并发标记阶段用户线程修改影响的一部分对象的标记
4. 并发清除：清除非存活对象，并回收垃圾

优点：低延迟，并发收集。
缺点：会产生内存碎片，占用CPU资源导致用户线程慢。

### G1垃圾回收器

> jdk1.7发布的低延迟并发垃圾回收器，适应于老年代，采用分Region收集思想。

1. 初始标记（STW）：只标记GC Roots引用到的对象
2. 并发标记：从GC Roots根对象开始做可达性分析，标记能到达的对象
3. 最终标记（STW）：修正并发标记阶段用户线程修改影响的一部分对象的标记
4. 筛选回收：对堆中的各个Region做回收价值和成本排序，结合用户预期停顿时间制定回收计划并执行。

优点：并行并发收集，低延迟，无内存碎片。

实现细节：请参考[卡表 和 记忆集](http://mg.meiflower.top/mb/post/jvm/HotSpot%E5%9E%83%E5%9C%BE%E7%AE%97%E6%B3%95%E5%AE%9E%E7%8E%B0%E4%B9%8B%E8%AE%B0%E5%BF%86%E9%9B%86%E4%B8%8E%E5%8D%A1%E8%A1%A8%E5%92%8C%E5%86%99%E5%B1%8F%E9%9A%9C/)。

### 执行引擎

## Spring

### Spring中Bean的生命周期

### Spring是如何解决循环依赖的

3级缓存 + 提前暴露对象

实例化，依赖注入，初始化

* 一级缓存 singtonObjects - 存放已经完全创建好的bean的单例对象
* 二级缓存 earlySingtonObjects - 存放早期暴露的bean对象，实例化完成还没有依赖注入和初始化的bean
* 三级缓存 singtonFactories - 存放创建bean的工厂对象，当获取一个bean时，如果没有被创建，会先从 singtonFactories 中获取其对应bean工厂，然后使用bean工厂创建bean对象，并将创建成功的bean对象放到 singtonObjects 中。

### 2级缓存就可以解决循环依赖，为什么要3级缓存呢？

二级缓存任然存在一些限制，比如如果Bean对象在初始化过程中出现异常无法完成创建，这样还是会出现循环依赖问题。

## SpringBoot

## 微服务SpringCloud
### 微服务组件有哪些
* 注册中心 - eukera 、 (nacos、consxx)
* 网关 - spring cloud gateway 、 (zuul)
* 调用 - feign
* 负载均衡 - ribbon
* 限流熔断 - hystrix
* 配置中心 - spring cloud config 、 (nacos)

## 微服务Dubbo

## 分布式理论

### 基础理论CAP

* C - 一致性，指集群中所有节点的数据一致
* A - 可用性，指集群服务对外能响应请求
* P - 分区容错性，指数据需要分片，防止单点故障

论文指出，一般只能保证其中的2者，不能同时保证3者。

### 负债均衡 - 一致性Hash算法

## 分布式缓存Redis

## 消息队列Kafka

## 分布式锁
### 分布式锁的实现方式？
* 基于数据库实现，插入数据表示获取锁。
* 基于redis实现，`String`类型的`setNX`方法实现，抢着key，并设置适当的过期时间，防止死锁。（进阶可以使用红锁）
* 基于zookeeper实现，`临时顺序节点` + `watch节点监控`实现，临时顺序节点保证锁失效后zk会清除防止死锁，watch监控则保证锁释放后后面顺序的等待线程能获取到分布式锁。

## 分布式事务
### 什么是分布式事务？
是跨越多个节点的事务，需要协调多个参与者的操作，保证都成功或者都失败。
主要有如下实现方式：

1. 2PC协议（2阶段提交）
2PC协议是最常用的分布式事务协议，它采用“两阶段提交”的方式来协调分布式事务。2PC协议的实现复杂，但能够保证事务的一致性和可靠性。

2. TCC事务（补偿性事务）
TCC事务是一种补偿性事务，它通过在每个参与者中实现“尝试（try）”、“确认（confirm）”和“取消（cancel）”三个操作来实现事务的提交和回滚。TCC事务的实现相对简单，但需要应用程序对业务逻辑进行分解。

3. 基于消息的事务
基于消息的事务是一种异步事务，它通过消息队列来实现事务的提交和回滚。在基于消息的事务中，每个参与者都将操作封装成消息发送到消息队列中，如果所有消息都发送成功，则事务提交成功，否则进行回滚操作。基于消息的事务能够实现高可用性和可伸缩性，但需要应用程序对消息传递进行处理。

4. 最终一致性事务
最终一致性事务是一种弱一致性事务，它通过异步复制来实现数据的最终一致性。在最终一致性事务中，参与者提交事务时不需要等待其他参与者的响应，数据最终一致性由后台的异步复制机制来保证。最终一致性事务的实现相对简单，但需要应用程序进行一些额外的逻辑处理。

在选择分布式事务的实现方式时，需要根据应用场景和需求进行选择。
例如，如果要求事务的一致性和可靠性较高，则可以选择2PC协议；如果需要实现高可用性和可伸缩性，则可以选择基于消息的事务。

## 算法
1. 求一个数`N`是否为`质数(只能背自己和1整除)`，只需要判断`2`到`sqrt(N)`之间是否能找到因子，找不到则是质数。
2. Java的`TreeSet`数据结构，基于`红黑树`实现，提供唯一且有序的集合功能。
3. Java的Math库函数：
* abs：计算绝对值
* sqrt：计算平方根
* pow：计算幂次方
* sin、cos、tan：计算三角函数值
* asin、acos、atan：计算三角函数的反函数值
* log、log10：计算自然对数和10为底的对数
* random：生成一个[0,1)之间的随机数
* ceil、floor、round：对浮点数进行上取整、下取整、四舍五入等操作
* max、min：求两个数的最大值和最小值
* hypot：计算两个数的平方和的平方根

4. 基于优先级队列`PriorityQueue`排序，支持重复元素，而`TreeSet`则不支持重复。