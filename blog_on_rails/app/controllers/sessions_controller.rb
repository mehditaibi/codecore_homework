class SessionsController < ApplicationController

    def new
    end

    def create
        user = User.find_by_email params[:email]

        if user&.authenticate(params[:password])
            session[:user_id] = user.id
            flash[:success] = "Hello, #{user.name} ✋🏻"
            redirect_to "/"
        else
            flash[:danger] = "Email or password is wrong, try again!"
            render :new
        end
    end

    def destroy
        user= User.find_by_id(session[:user_id])
        flash[:success] = "Good Bye, #{user.name} ✋🏻"
        session[:user_id] = nil
        redirect_to '/'
    end
end