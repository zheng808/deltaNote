import React from 'react';


const login = () =>{
        return(
            <div class="forms-container">
            <div class="signin-signup">
                <form action="/auth/login" method="post" class="sign-in-form">
                    <h2 class="title">Sign in</h2>
                    <div class="input-field">
                    <i class="fas fa-user"></i>
                    <input type="text" placeholder="Email" name="email"/>
                    </div>
                    <div class="input-field">
                    <i class="fas fa-lock"></i>
                    <input type="password" placeholder="Password" name="password"/>
                    </div>
                    <div class="login-button">
                        <input type="submit" value="Login" class="btn-login" />
                    </div>
                </form>
            </div>
    </div>
    );
}

export default login;