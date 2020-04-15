import React, { Component } from "react";
import * as d3 from "d3";
import {
  Segment,
  Button,
  Header,
  Message,
  Loader,
  Popup,
  Input
} from "semantic-ui-react";

export default class AudioVisualization extends Component {
  state = {
    width: 1600,
    height: 760,
    ytUrl: "",
    inValidYtUrl: false,
    isYtUrlPopOpen: false,
    inProgress: false
  };

  fileInputRef = React.createRef();

  componentDidMount() {
    //loading event listners
    this.audioElement.onloadstart = () => this.setState({ inProgress: true });
    this.audioElement.oncanplay = () => this.setState({ inProgress: false });
    this.audioElement.onwaiting = () => this.setState({ inProgress: true });

    this.initAudioContext(this.audioElement);
    this.prepareVisualizer();
  }

  initAudioContext = (audioElement) => {
    //init audioContext
    this.audioCtx = new (window.webkitAudioContext || window.AudioContext)();
    this.audioSrc = this.audioCtx.createMediaElementSource(audioElement);
    this.analyser = this.audioCtx.createAnalyser();

    // bind analyser to the media element source.
    this.audioSrc.connect(this.analyser);
    this.audioSrc.connect(this.audioCtx.destination);

    this.bufferSize = this.analyser.frequencyBinCount;
    this.frequencyData = new Uint8Array(512);

    // this.analyser.getByteTimeDomainData(this.frequencyData);
  };

  transformAudioData = () => {
    this.analyser.getByteFrequencyData(this.frequencyData);
    const data = [];

    this.frequencyData.forEach((d, i) => {
      let obj = { x: d + i };

      d3.range(8).map(
        (number, j) => (obj[`sample${number}`] = d / 50 + number)
      );

      data.push(obj);
    });

    return data;
  };

  prepareVisualizer = () => {
    const { width, height } = this.state;

    const stack = d3.stack().keys(
      d3.range(8).map(function (sample) {
        return "sample" + sample;
      })
    );
    // .offset(d3.stackOffsetNone);

    const layers = stack(this.transformAudioData());

    const xScale = d3
      .scaleLinear()
      .domain([0, this.frequencyData.length])
      .range([0, width]);

    const yScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(layers, function (layer) {
          return d3.max(layer, function (d) {
            return d[0];
          });
        })
      ])
      .range([height, 0]);

    const color = d3.interpolateCool;

    const area = d3
      .area()
      .x((d, i) => xScale(i))
      .y0((d) => yScale(d[0]))
      .y1((d) => yScale(d[1]));

    this.svg
      .selectAll("path")
      .data(layers)
      .enter()
      .append("path")
      .attr("d", area)
      .style("fill", () => color(Math.random()));

    this.drawAudio(area, stack, yScale);
  };

  drawAudio = (area, stack, yScale) => {
    requestAnimationFrame(() => this.drawAudio(area, stack, yScale));

    const layers = stack(this.transformAudioData());

    // override the initial y scale to make it dynamic
    yScale.domain([
      0,
      d3.max(layers, function (layer) {
        return d3.max(layer, function (d) {
          return d[1];
        });
      })
    ]);

    d3.selectAll("path")
      .data(layers)
      // .transition()
      // .duration(60)
      .attr("d", area);
  };

  randomeColor = () => {
    const color = d3.interpolateCool;

    this.svg
      .selectAll("path")
      .transition()
      .style("fill", () => color(Math.random()));
  };

  fileChange = (e) => {
    const file = e.target.files[0];

    this.setState({ file, audioTitle: file.name }, () => {
      this.audioElement.src = URL.createObjectURL(this.state.file);
      this.audioElement.play();

      this.randomeColor();
    });
  };

  submitYtUrl = (e) => {
    const { ytUrl } = this.state;

    this.setState({ inProgress: true });

    const basePath =
      process.env.NODE_ENV === "production"
        ? `${process.env.REACT_APP_YT_AUDIO_STREAM_BASE_URL}`
        : "http://localhost:5000";

    fetch(`${basePath}/api/stream/audio`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({ url: ytUrl })
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const { url, title } = data;

          this.audioElement.src = url;
          this.audioElement.play();

          this.randomeColor();

          this.setState({
            isYtUrlPopOpen: false,
            audioTitle: title,
            inProgress: false
          });
        } else {
          this.setState({
            inValidYtUrl: true,
            errorMessage: data.error,
            inProgress: false
          });
        }
      })
      .catch((err) => {
        this.setState({
          inValidYtUrl: true,
          errorMessage: err.error,
          inProgress: false
        });
      });
  };

  render() {
    let {
      width,
      height,
      inProgress,
      ytUrl,
      inValidYtUrl,
      isYtUrlPopOpen,
      errorMessage,
      audioTitle
    } = this.state;
    return (
      <>
        <Segment textAlign="center">
          <Header as="h3" className="title">
            Audio Visualizer
            <Header.Subheader className="desc">
              Visualize audio frequencies using WebApi and d3.
            </Header.Subheader>
          </Header>
          {audioTitle && (
            <marquee id="title-scroller" width="300px" direction="left">
              {audioTitle}
            </marquee>
          )}
          <div className="visualizer-top-bar">
            <div className="audio-player">
              {inProgress && (
                <Loader active inline style={{ margin: "0 10px 0 10px" }} />
              )}
              <audio
                id="audioElement"
                ref={(element) => (this.audioElement = element)}
                src={
                  "https://dl.dropbox.com/s/tg2axtfwau4kc36/nightingale-ver-2.mp3"
                }
                controls
                controlsList="nodownload"
                crossOrigin="anonymous"
              ></audio>
            </div>

            <div className="btns">
              <Button
                icon="file"
                onClick={() => this.fileInputRef.current.click()}
              />
              <input
                ref={this.fileInputRef}
                type="file"
                hidden
                onChange={this.fileChange}
                accept="audio/*"
              />
              <Popup
                on="click"
                pinned
                offset="0, 10px"
                position="bottom center"
                open={isYtUrlPopOpen}
                onClose={() => this.setState({ isYtUrlPopOpen: false })}
                onOpen={() => this.setState({ isYtUrlPopOpen: true })}
                trigger={<Button icon="youtube" />}
              >
                <Input
                  action={{ icon: "search", onClick: this.submitYtUrl }}
                  // loading
                  error={inValidYtUrl}
                  placeholder="Paste in youtube video url"
                  value={ytUrl}
                  onChange={(e) => {
                    this.setState({ ytUrl: e.target.value });

                    if (inValidYtUrl) {
                      this.setState({ inValidYtUrl: false, errorMessage: "" });
                    }
                  }}
                />
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                <div
                  style={{
                    fontSize: "14px",
                    marginTop: "14px",
                    fontWeight: 400,
                    color: "#acacac"
                  }}
                >
                  Youtube audio streaming server hosted on &nbsp;
                  <a
                    href="https://yt-audio-stream.glitch.me"
                    target="_blank"
                    without="true"
                    rel="noopener noreferrer"
                  >
                    Glitch
                  </a>
                </div>
              </Popup>

              <Button icon="random" onClick={this.randomeColor} />
            </div>
          </div>
          <div className="responsive-svg-container">
            <svg
              viewBox={`0 0 ${width} ${height}`}
              style={{ font: "10px", maxWidth: width, maxHeight: height }}
              ref={(element) => (this.svg = d3.select(element))}
            ></svg>
          </div>
        </Segment>
        <Message
          header="Info"
          list={[
            <a
              key="source_code"
              href="https://github.com/farhankk360/js-visualize/blob/master/src/components/MusicVis/AudioVisualization/index.js"
              target="_blank"
              without="true"
              rel="noopener noreferrer"
            >
              Source code
            </a>,
            <p key="yt-audio-stream-server">
              Youtube audio streaming server &nbsp;
              <a
                href="https://github.com/farhankk360/yt-audio-stream-server"
                target="_blank"
                without="true"
                rel="noopener noreferrer"
              >
                Git repo
              </a>
            </p>,
            <p key="youtube-profile">
              Visit my Youtube music{" "}
              <a
                href="https://www.youtube.com/farhankk360"
                target="_blank"
                without="true"
                rel="noopener noreferrer"
              >
                channel
              </a>
              &nbsp;for more music, Default audio track &nbsp;
              <a
                href="https://www.youtube.com/watch?v=vwBkZAbEiEU"
                target="_blank"
                without="true"
                rel="noopener noreferrer"
              >
                Nightingale Ver 2.0 (Sampled)
              </a>
            </p>,
            <p key="wiki_link">
              More information on Music visualization &nbsp;
              <a
                href="https://en.wikipedia.org/wiki/Music_visualization"
                target="_blank"
                without="true"
                rel="noopener noreferrer"
              >
                Wiki
              </a>
            </p>
          ]}
        />
      </>
    );
  }
}
