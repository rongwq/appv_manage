package com.rong.api.config;

import javax.servlet.http.HttpServletResponse;

import com.jfinal.aop.Interceptor;
import com.jfinal.aop.Invocation;
import com.rong.common.bean.BaseRenderJson;
import com.rong.common.bean.MyErrorCodeConfig;

public class CommonInterceptor implements Interceptor {

	/**
	 * 控制器操作主逻辑 加入事务操作
	 * 
	 * @param ai
	 * @return
	 */
	private boolean doMain(Invocation ai) {
		try {
			ai.invoke();// 然后调用
		} catch (Exception e) {
			e.printStackTrace();
			BaseRenderJson.returnBaseTemplateObj(ai.getController(), MyErrorCodeConfig.REQUEST_FAIL, e.getMessage());
		}
		return true;
	}

	@Override
	public void intercept(Invocation ai){
		// 跨域处理
		setResponseHeader(ai.getController().getResponse());
		doMain(ai);
	}
	
	/**
	 * 通过设置响应头里的Header，来指定可以跨域访问的客户端
	 * @param response
	 */
	private static void setResponseHeader(HttpServletResponse response) {
		response.addHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Credentials", "true");
		response.setHeader("Access-Control-Allow-Methods", "*");
		response.setHeader("Access-Control-Allow-Headers", "Content-Type,Access-Token");
		response.setHeader("Access-Control-Expose-Headers", "*");
	}
}
