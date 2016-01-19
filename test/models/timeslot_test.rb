require 'test_helper'

class TimeslotTest < ActiveSupport::TestCase
  test "valid timeslot with valid attributes" do
    timeslot = Timeslot.new(date: Date.today,
                            user_id: 2,
                            start_time: Time.now,
                            end_time: Time.now,
                            schedule_id: 1)

    assert timeslot.valid?
  end

  test "invalid timeslot without date" do
    timeslot = Timeslot.new(user_id: 2,
                            start_time: Time.now,
                            end_time: Time.now,
                            schedule_id: 1)

    refute timeslot.valid?
  end

  test "valid timeslot without user id" do
    timeslot = Timeslot.new(date: Date.today,
                            start_time: Time.now,
                            end_time: Time.now,
                            schedule_id: 1)

    assert timeslot.valid?
  end

  test "invalid timeslot without start time" do
    timeslot = Timeslot.new(date: Date.today,
                            user_id: 2,
                            end_time: Time.now,
                            schedule_id: 1)

    refute timeslot.valid?
  end

  test "invalid timeslot without end time" do
    timeslot = Timeslot.new(date: Date.today,
                            user_id: 2,
                            start_time: Time.now,
                            schedule_id: 1)
    refute timeslot.valid?
  end

  test "valid timeslot without schedule id" do
    timeslot = Timeslot.new(date: Date.today,
                            user_id: 2,
                            start_time: Time.now,
                            end_time: Time.now)

    refute timeslot.valid?
  end
end
