require 'test_helper'

class ScheduleTest < ActiveSupport::TestCase
  test "valid schedule with valid attributes" do
    schedule = Schedule.new(title: "Test",
                            user_id: 1,
                            start_date: Date.today,
                            end_date: Date.tomorrow)

    assert schedule.valid?
  end

  test "invalid schedule without title" do
    schedule = Schedule.new(user_id: 1,
                            start_date: Date.today,
                            end_date: Date.tomorrow)

    refute schedule.valid?
  end

  test "invalid schedule without user id" do
    schedule = Schedule.new(title: "Test",
                            start_date: Date.today,
                            end_date: Date.tomorrow)

    refute schedule.valid?
  end

  test "invalid schedule without start date" do
    schedule = Schedule.new(title: "Test",
                            user_id: 1,
                            end_date: Date.tomorrow)

    refute schedule.valid?
  end

  test "invalid schedule without end_date" do
    schedule = Schedule.new(title: "Test",
                            user_id: 1,
                            start_date: Date.today)
    refute schedule.valid?
  end

  test "invalid schedule if user has already used title" do
    skip
    Schedule.create(title: "Test",
                    user_id: 1,
                    start_date: Date.today,
                    end_date: Date.tomorrow)
    schedule = Schedule.new(title: "Test",
                            user_id: 1,
                            start_date: Date.today,
                            end_date: Date.tomorrow)
    refute schedule.valid?
  end
end
