class Api::V1::ProfilesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @current_user = current_user
    @events = Event.where(user_id: current_user.id)
    render json: {:events => @events, :user => @current_user}
  end
end
