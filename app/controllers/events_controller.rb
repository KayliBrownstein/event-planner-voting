class EventsController < ApplicationController
  def show
    @location = Location.new
    @datetime = Datetime.new
    @event = Event.find(params[:id])
    session[:ugid] = @event.id
  end


  def new
    @event = Event.new
  end

  def create
    @event = Event.new(event_params)
    if @event.save
      session[:ugid] = @event.id
      redirect_to '/event_members/create'
      flash[:notice] = "Event added successfully"
    else
      flash[:notice] = @event.errors.full_messages.join(", ")
      render :new
    end
  end

  def edit
    @event = Event.find(params[:id])
    session[:ugid] = @event.id
    @invite = Invite.new
  end

  def update
    @event = Event.find(params[:id])
    @event.update(event_params)
    redirect_to event_path(@event)
  end

  private

  def event_params
    params.permit(:name, :user_id, :description, :cutoff_time, :suggested_date, :suggested_location, :suggested_time)
  end
end
