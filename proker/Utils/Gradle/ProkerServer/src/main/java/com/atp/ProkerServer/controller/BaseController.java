package com.atp.ProkerServer.controller;


import com.atp.ProkerServer.controller.exceptions.ControllerException;

import javax.servlet.http.HttpSession;

public class BaseController {

    static String OK_MESSAGE = "\"ok\"";

    public static boolean isUserLogged(HttpSession session) {
        if (session == null)
            throw new ControllerException("No sessions available!");
        String userId = (String) session.getAttribute("dpc_auth_id");
        return userId != null;
    }

    public static String getLoggedUser(HttpSession session) {
        if (session == null) {
            throw new ControllerException("No sessions available!");
        }
        String userId = (String) session.getAttribute("dpc_auth_id");
        if (userId == null)
            throw new ControllerException("User is not authenticated!");
        return userId;
    }

    public static void checkNotLoggedIn(HttpSession session) {
        if (session == null) {
            throw new ControllerException("No sessions available!");
        }
        String userId = (String) session.getAttribute("dpc_auth_id");
        if (userId != null)
            throw new ControllerException("User is already authenticated!");
    }
}
