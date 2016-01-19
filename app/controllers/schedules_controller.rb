class SchedulesController < ApplicationController
  before_action :authenticate_user

  def index

  end

  def show
    @schedule = Schedule.includes(:timeslots).find(params[:id])
  end

end
