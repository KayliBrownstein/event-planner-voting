class Api::V1::EventsController < ApplicationController
  skip_before_filter :verify_authenticity_token

  def current_user
    @current_user ||=
      if session[:user_id]
        User.find(session[:user_id])
      elsif Rails.env == 'test'
        User.first
      end
  end

  def index
    @current_user = current_user
    @events = Event.where(user_id: @current_user.id)
    render json: @events
  end

  def new
    @event = Event.new
    render json: @event
  end

  def create
    @event = Event.create!(event_params)
    @event.user_id = current_user.id
    if @event.save!
      render json: @event
    else
      flash[:error] = "Error"
    end
  end

  def show
    @user = current_user
    @event = Event.find(params[:id])

    if @event.cutoff_time.to_date >= Date.today
      @event_ended = false
    else
      @event_ended = true
      @location_winner = @event.winning_location
      @datetime_winner = @event.winning_datetime

      @location_winner_name    = @location_winner ? @location_winner.name : ''
      @location_winner_address = @location_winner ? @location_winner.address_to_s : ''
      @datetime_winner_date    = @datetime_winner ? @datetime_winner.date : ''
      @datetime_winner_time    = @datetime_winner ? @datetime_winner.time : ''
    end

    @locations = @event.locations
    @datetimes = @event.datetimes
    @invitee_emails = Invite.where(event_id: @event.id).pluck(:email).uniq.join(', ')

    render json: {
      event: @event,
      event_ended: @event_ended,
      datetime_winner_date: @datetime_winner_date,
      datetime_winner_time: @datetime_winner_time,
      location_winner_name: @location_winner_name,
      location_winner_address: @location_winner_address,
      invitee_emails: @invitee_emails
    }
  end

  def edit
    @event = Event.find(params[:id])
    render :update
  end

  def update
    @event = Event.find(params[:id])
    @event.update(event_params)
    redirect_to edit_event_path(@event)
  end

  def destroy
    @event = Event.find(params[:id])
    @event.destroy
  end

  private

  def event_params
    params.require(:event).permit(:name, :user_id, :cutoff_time, :description)
  end
end
