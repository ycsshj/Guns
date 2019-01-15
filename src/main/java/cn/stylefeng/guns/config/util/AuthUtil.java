package cn.stylefeng.guns.config.util;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;

import java.io.IOException;

public class AuthUtil {
    public static final String OPENID = "OPENID";
    public static final String NICKNAME = "NICKNAME";
    public static final String APPID = "wx8212f6198zd8e227";
    public static final String APPSECRET = "8de6z459ef5b8c0cf4f90eb46cb69ez6";
//    public static final String SERVER = "http://193.112.92.40/photo";
    public static final String SERVER = "http://ycsshj.oicp.net/photo";
    public static final String REDIRECT_URI = "http://ycsshj.oicp.net/photo/weChatApi/callBack";
    public static final String TOKEN = "weixi";
    public static  String ACCESS_TOKEN = null;
    public static  String TIMESTAMP = null;
    public static  String JSAPI_TICKET = null;
    // 获取token的url
    public static final String TOKENURL = "https://api.weixin.qq.com/cgi-bin/token";
    // 多媒体文件上传url
    public static final String MEDIAURL = "http://file.api.weixin.qq.com/cgi-bin/media/upload?access_token=";
    // 通过openid获取微信信息url
    public static final String OPENIDUSERINFOURL = "https\\://api.weixin.qq.com/cgi-bin/user/info";
    // 获取jsticket的url
    public static final String TICKETURL = "https://api.weixin.qq.com/cgi-bin/ticket/getticket";

    public static JSONObject doGetJson(String url) throws ClientProtocolException, IOException {
        JSONObject jsonObject = null;
        //首先初始化HttpClient对象
        DefaultHttpClient client = new DefaultHttpClient();
        //通过get方式进行提交
        HttpGet httpGet = new HttpGet(url);
        //通过HTTPclient的execute方法进行发送请求
        HttpResponse response = client.execute(httpGet);
        //从response里面拿自己想要的结果
        HttpEntity entity = response.getEntity();
        if(entity != null){
            String result = EntityUtils.toString(entity,"UTF-8");
            jsonObject = JSON.parseObject(result);
        }
        //把链接释放掉
        httpGet.releaseConnection();
        return jsonObject;
    }
}
