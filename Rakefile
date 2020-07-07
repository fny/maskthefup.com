require 'image_optim'
require "mini_magick"


def resize(input_path, output_path, width, height, quality)
  img = MiniMagick::Image.open(input_path)
  w_original = img[:width].to_f
  h_original = img[:height].to_f

  # check proportions
  op_resize = if w_original * height < h_original * width
                  "#{width.to_i}x"
              else
                  "x#{height.to_i}"
              end

  img.combine_options do |i|
    i.resize(op_resize)
    i.gravity(:center)
    i.quality quality.to_s if quality.to_i > 1 && quality.to_i < 100
    i.crop "#{width.to_i}x#{height.to_i}+0+0!"
  end

  img.write(output_path)
end

task :optimize do
  image_optim = ImageOptim.new(allow_lossy: true, jpegrecompress: { quality: 2 },  jpegoptim: { max_quality: 80 })
  image_optim.optimize_images!(Dir['images/**/*.*'])
end

task :thumbnails do
  images = Dir.glob('images/memes/*')
  images.each do |i|
    resize(i, "images/memes-thumbs/#{File.basename(i)}", 300, 300, 80)
  end
end
