require "sinatra/base"
require "RMagick"
require "fileutils"
require "open-uri"
require "json"

class BitmojiGifServer < Sinatra::Base

  # public static directories
  use Rack::Static, :urls => ["/tmp", "/public"]

  # default, no avatar id
  get "/templates" do
    generate_gifs_for_avatar_id "104556134_20-s4-v1"
  end

  # custom avatar id
  get "/templates/:avatar_id" do
    generate_gifs_for_avatar_id params["avatar_id"]
  end

  def generate_gifs_for_avatar_id(avatar_id)
    content_type :json

    gifs = []

    data = [
      [ 7193113, 9462153, 7193113, 9462157 ], # world's crudest waving gif,
      [ 9449032, 9462306, 9462338, 9462322 ], # basic santa wave v1
      [ 9462463, 9462473, 9462485, 9462505 ], # good morning
      [ 9463270, 9463272, 9463273, 9463275, 9463287, 9463289, 9463297, 9463296, 9463299, 9463300 ], # rain
      [ 9463357, 9463361, 9463365, 9463368, 9463370, 9463374 ], # confetti
      [ 9462767, 9462770, 9462790 ], # haha
      [ 9463009, 9463130 ], # brrr
      [ 9463153, 9463157, 9463194, 9463197, 9463200, 9463204, 9463216, 9463217] # pbj
    ]

    template_url = "https://da8lb468m8h1w.cloudfront.net/v2/cpanel/%s-%s.png?palette=1";

    data.each_with_index do |set, set_index|
      directory = "tmp/#{set_index}"
      FileUtils::mkdir_p directory

      set.each_with_index do |template_id, template_index|
        template = sprintf template_url, template_id, avatar_id

        File.open("#{directory}/#{template_index}.png", "wb") do |fo|
          fo.write open(template).read
        end
      end

      # make the GIFs
      output = "#{directory}/animated.gif"

      animation = Magick::ImageList.new(*Dir["#{directory}/*.png"])
      animation.delay = 15
      animation.write(output)
      gifs.push("#{request.base_url}/#{output}")
    end

    { "data" => gifs }.to_json
  end

end
