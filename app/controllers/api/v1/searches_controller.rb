class Api::V1::SearchesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    @current_user = current_user
    @events_by_user = Event.where(user_id: @current_user.id)
    event_ids = Invite.where(email: @current_user.email).pluck(:event_id).uniq
    events_invited_to = Event.where(id: event_ids)
    @events = @events_by_user + events_invited_to

    if params[:query]
      query = params[:query]
      @search_results = Event.where("name ilike ?", "%#{query}%")
      render json: @search_results
    # else
    #   @events = Event.all.order("created_at DESC")
    end
  end

  private

  def search_params
    params.permit(:query)
  end
end
