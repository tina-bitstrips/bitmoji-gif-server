require 'sinatra/base'
require 'RMagick'
require 'fileutils'
require "open-uri"
require 'json'

class BitmojiGifServer < Sinatra::Base

  set :static, true
  set :public_folder, '/tmp'

  use Rack::Static, :urls => ['/tmp']
  
  get '/templates/:avatar_id' do
    gifs = []
    avatar_id = params['avatar_id'] or '104556134_20-s4-v1'
    
    # binding.pry
    
    template_url = 'https://da8lb468m8h1w.cloudfront.net/v2/cpanel/%s-%s.png?palette=1';

    data = [
      [ 7193113, 9462153, 7193113, 9462157 ], # world's crudest waving gif,
      [ 9449032, 9462306, 9462338, 9462322 ], # basic santa wave v1
      [ 9462463, 9462473, 9462485, 9462505 ], # good morning
      [ 9463270, 9463272, 9463273, 9463275, 9463287, 9463289, 9463297, 9463296, 9463299, 9463300 ], # rain
      [ 9463357, 9463361, 9463365, 9463368, 9463370, 9463374 ], # confetti
      [ 9462767, 9462770, 9462790 ], # haha
      [ 9463009, 9463020 ] # brrr
    ]

    data.each_with_index do |set, index|
      directory = "tmp/#{index}"
      FileUtils::mkdir_p directory

      images_to_gif = set.map do |template_id|
        template = sprintf template_url, template_id, avatar_id

        File.open("#{directory}/#{template_id}.png", 'wb') do |fo|
          fo.write open(template).read 
        end
      end

      # make the GIFS
      animation = Magick::ImageList.new(*Dir["#{directory}/*.png"])
      animation.delay = 10
      animation.write("#{directory}/animated.gif")
      
      gifs.push("/#{directory}/animated.gif")
    end

    return { "data" => gifs }.to_json

  end

end
