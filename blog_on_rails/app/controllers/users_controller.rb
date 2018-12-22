class UsersController < ApplicationController
   
    before_action :authenticate_user!, only: [:edit, :update]
    before_action :authorize_user!, only: [:edit, :update]

    def new
        @user = User.new
    end

    def create
        @user = User.new user_params 
        if @user.save
            session[:user_id] = @user.id
            flash[:success] = "Hello, #{@user.name} ✋🏻"
            redirect_to ("/")
        else 
            flash[:danger] = "Something went wrong.. please try again! "
            render :new
        end
    end

    def edit
        @user = User.find params[:id]
    end

    def update
        @user = User.find params[:id]
        if @user.update user_params
            redirect_to "/"
        else
            render :edit
        end
    end

    def edit_password
        @user = User.find params[:id]
    end

    def update_password 
        @user = User.find params[:id]
        current_password = password_params[:current_password]
        new_password = password_params[:new_password] 
        new_password_confirmation = password_params[:new_password_confirmation]

        if current_password != new_password && new_password == new_password_confirmation
            @user.password = new_password
            @user.save
            redirect_to "/"
        else
        render :edit_password
        end
    end

    private

    def password_params
        params.permit(:current_password, :new_password, :new_password_confirmation)
    end

    def user_params
        params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end

    def authorize_user!
        @user = User.find params[:id]
        unless can?(:crud, @user)
            redirect_to "/"
        end
    end

end
