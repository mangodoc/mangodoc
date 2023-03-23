## plantuml示例
``` plantuml
@startuml
应用进程 -> 系统内核: 1.发起IO系统调用，应用进程被阻塞
系统内核 -> 系统内核: 2.内核开始等待数据
系统内核 -> 应用进程: 3.系统内核等待到数据后copy到用户内存并返回
应用进程 -> 应用进程: 4.应用进程解除阻塞状态，继续运行业务逻辑
@enduml
```

## java代码高亮
``` java
import java.sql.*;

/**
 * @Author: mango
 * @Date: 2022/12/31 7:58 PM
 */
public class App {
    public static void main(String[] args) throws ClassNotFoundException, SQLException {
        // 1. 加载驱动
        Class.forName("com.mysql.jdbc.Driver");
        // 2. 获取链接
        Connection connection = DriverManager.getConnection("jdbc:mysql://127.0.0.1:33306/url_function?useUnicode=true&characterEncoding=UTF-8",
                "root", "123456");
        // 3. 执行sql
        PreparedStatement preparedStatement = connection.prepareStatement("select * from t_user");
        ResultSet resultSet = preparedStatement.executeQuery();
        while (resultSet.next()){
            String userId = resultSet.getString("userId");
            String userName = resultSet.getString("userName");
            String email = resultSet.getString("email");
            String phone = resultSet.getString("phone");
            System.out.println("userId="+userId+",userName="+userName+",email="+email+",phone="+phone);
        }
        // 4. 关闭链接资源
        connection.close();
    }
}
```