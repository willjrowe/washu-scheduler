class SearchElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      results: {},
      loading: false,
      message: "",
      bigData: require("../lib/washu-scrape-export.json"),
      courseLoad: {},
    };
    this.performSearch = this.performSearch.bind(this);
    this.addCourse = this.addCourse.bind(this);
    this.removeCourse = this.removeCourse.bind(this);
  }

  addCourse = (event) => {
    var { courseLoad } = this.state;
    courseLoad[event.target.name] = this.state.bigData["artsci"][
      "AMERICAN CULTURE STUDIES(L98)"
    ][event.target.name];
    this.setState({ courseLoad: courseLoad });
  };

  removeCourse = (event) => {
    var { courseLoad } = this.state;
    delete courseLoad[event.target.name];
    this.setState({ courseLoad: courseLoad });
  };

  handleOnInputChange = (event) => {
    const query = event.target.value;
    //to update on form input change
    // this.setState({ query, loading: true, message: "" }, () => {
    //   this.performSearch();
    // });
    this.setState({ query, loading: true, message: "" });
  };

  performSearch() {
    var results = [];
    if (this.state.query != "") {
      results.push(
        this.state.bigData["artsci"]["AMERICAN CULTURE STUDIES(L98)"][
          this.state.query
        ]
      );
    }
    this.setState({ results: results });
  }

  renderCourseLoad = () => {
    const { courseLoad } = this.state;
    if (Object.keys(courseLoad).length) {
      const courses = [];
      for (let course in courseLoad) {
        courses.push(
          <div>
            <h1>
              {courseLoad[course]["Course Number"]}:{" "}
              {courseLoad[course]["Course Name"]}
              <button
                name={courseLoad[course]["Course Number"]}
                onClick={this.removeCourse}
              >
                Remove
              </button>
            </h1>
          </div>
        );
      }
      return <div>{courses}</div>;
    }
  };

  renderSearchResults = () => {
    const { results } = this.state;
    if (results.length) {
      return (
        <div>
          {results.map((result) => {
            return (
              <div>
                <h1>{result["Course Name"]}</h1>
                {/* will need to pass more info up from button to correctly identify classs
                can we pass whole object???? */}
                <button name={result["Course Number"]} onClick={this.addCourse}>
                  Add course
                </button>
                {result["Sections"].map((section) => {
                  return (
                    <p>
                      {section["Time"]}: {section["Days"]}
                    </p>
                  );
                })}
              </div>
            );
          })}
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <input
          type="text"
          id="search-input"
          placeholder="Search..."
          onChange={this.handleOnInputChange}
        />
        <button onClick={this.performSearch}>Search by title</button>
        {this.renderSearchResults()}
        <h1>Current Courses Selected</h1>
        {this.renderCourseLoad()}
      </div>
    );
  }
}

export default function search() {
  return <SearchElement />;
}
