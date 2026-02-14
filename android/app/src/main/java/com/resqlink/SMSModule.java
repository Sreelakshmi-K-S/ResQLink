package com.resqlink;

import android.app.Activity;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.telephony.SmsManager;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class SMSModule extends ReactContextBaseJavaModule {
    
    private static final String MODULE_NAME = "RNSMSModule";
    private final ReactApplicationContext reactContext;

    public SMSModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return MODULE_NAME;
    }

    @ReactMethod
    public void sendSMS(String phoneNumber, String message, Promise promise) {
        try {
            SmsManager smsManager = SmsManager.getDefault();
            
            // If message is longer than 160 characters, divide it into multiple messages
            if (message.length() > 160) {
                smsManager.sendMultipartTextMessage(
                    phoneNumber,
                    null,
                    smsManager.divideMessage(message),
                    null,
                    null
                );
            } else {
                smsManager.sendTextMessage(
                    phoneNumber,
                    null,
                    message,
                    null,
                    null
                );
            }
            
            promise.resolve(true);
        } catch (Exception e) {
            promise.reject("SMS_ERROR", "Failed to send SMS: " + e.getMessage(), e);
        }
    }
}
