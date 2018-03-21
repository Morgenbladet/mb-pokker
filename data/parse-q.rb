require 'csv'
require 'json'
require 'pp'

class Question
  attr_accessor :id, :intro, :image, :alternatives

  def initialize
    self.alternatives = []
  end

  def to_json(a)
    {
      id: self.id,
      intro: self.intro,
      image: "ferret",
      alternatives: self.alternatives
    }.to_json
  end
end

class Alternative
  attr_accessor :text, :age, :geo, :edu, :sex

  def initialize(text, age, geo, edu, sex)
    self.text = text
    self.age = age
    self.geo = geo
    self.edu = edu
    self.sex = sex
  end

  def to_json(a)
    { text: self.text, age: self.age, geo: self.geo, edu: self.edu, sex: self.sex }.to_json
  end
end

file = ARGV[0]

lines = CSV.read(file, converters: [:integer])

current = nil
questions = []
id = 1

lines.each do |line|
  if line[0].nil?
    next if current.nil?
    questions << current
    id = id + 1
    current = nil
    next
  end

  if current.nil?
    current = Question.new
    current.id = id
    current.intro = line[0]
  else
    current.alternatives << Alternative.new(*line)
  end
end

puts JSON.generate(questions.shuffle)

