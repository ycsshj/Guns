package cn.stylefeng.guns.wechat.common;

import java.security.MessageDigest;
import java.util.Formatter;
import java.util.HashMap;
import java.util.UUID;

import cn.stylefeng.guns.config.util.AuthUtil;
import lombok.extern.slf4j.Slf4j;


/**
 * ClassName: JSSDK_Config
 * @Description: 用户微信前端页面的jssdk配置使用
 * @author
 * @date 2016年3月19日 下午3:53:23
 */
@Slf4j
public class JSSDK_Config {

	/**
	 * @Description: 前端jssdk页面配置需要用到的配置参数
	 * @param @return hashmap {appid,timestamp,nonceStr,signature}
	 * @param @throws Exception   
	 * @author
	 * @date 2016年3月19日 下午3:53:23
	 */
	public static HashMap<String, String> jsSDK_Sign(String url) throws Exception {
		String nonce_str = create_nonce_str();
		String timestamp= AuthUtil.TIMESTAMP;
		String jsapi_ticket=AuthUtil.JSAPI_TICKET;
		// 注意这里参数名必须全部小写，且必须有序
		String  string1 = "jsapi_ticket=" + jsapi_ticket + "&noncestr=" + nonce_str
				+ "&timestamp=" + timestamp  + "&url=" + url;
		MessageDigest crypt = MessageDigest.getInstance("SHA-1");
		crypt.reset();
		crypt.update(string1.getBytes("UTF-8"));
		String signature = byteToHex(crypt.digest());
		HashMap<String, String> jssdk=new HashMap<String, String>();
		jssdk.put("appId", AuthUtil.APPID);
		jssdk.put("timestamp", timestamp);
		jssdk.put("nonceStr", nonce_str);
		jssdk.put("signature", signature);
		return jssdk;

	}
	
	private static String byteToHex(final byte[] hash) {
		Formatter formatter = new Formatter();
		for (byte b : hash) {
			formatter.format("%02x", b);
		}
		String result = formatter.toString();
		formatter.close();
		return result;
	}
	
	private static String create_nonce_str() {
		return UUID.randomUUID().toString();
	}

}
