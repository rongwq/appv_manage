package com.rong.persist.model;

import com.rong.persist.model.base.BaseVersion;

/**
 * Generated by JFinal.
 */
@SuppressWarnings("serial")
public class Version extends BaseVersion<Version> {
	public static final Version dao = new Version().dao();
	public static final String TABLE = "appv_version";
	
	public static final Integer SYSTEM_ANDROID = 1;
	public static final Integer SYSTEM_IOS = 2;
}