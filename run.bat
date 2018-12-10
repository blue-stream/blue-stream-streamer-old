docker build -t streamer .

docker run -t -i -p 3001:3001 --rm --env-file=.env streamer