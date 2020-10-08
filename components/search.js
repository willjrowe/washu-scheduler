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
      validLoad: [],
    };
    this.performSearch = this.performSearch.bind(this);
    this.addCourse = this.addCourse.bind(this);
    this.removeCourse = this.removeCourse.bind(this);
    this.checkCourseLoad = this.checkCourseLoad.bind(this);
  }

  addCourse = (event) => {
    var { courseLoad } = this.state;
    var { bigData } = this.state;
    var courseName = event.target.name;
    var splitArray = courseName.split(" ");
    var cleanName = splitArray[splitArray.length - 1];
    cleanName = cleanName.replace(/[A-Za-z]/, "");
    var mappingObject = bigData["mappings"][cleanName][courseName];
    courseLoad[courseName] =
      bigData[mappingObject["School Division"]][mappingObject["Department"]][
        courseName
      ];
    this.setState({ courseLoad }, this.checkCourseLoad); //add a callback function here to see if courseload is valid
  };

  removeCourse = (event) => {
    var { courseLoad } = this.state;
    delete courseLoad[event.target.name];
    this.setState({ courseLoad }, this.checkCourseLoad);
  };

  //currLoad is an array of classes that are assumed non-colliding
  //section is an additional class that must be checked for collisions
  checkCourseAvail(currLoad, section) {
    //get new section time
    const sectionDays = section["Days"];
    const sectionTime = section["Time"];
    var sectionStart = new Date();
    var sectionEnd = new Date();
    var _t = sectionTime.split("-");
    var _start = _t[0].split(":");
    var _end = _t[1].split(":");
    var startHour = _start[0].replace(/\D/g, "");
    var startMin = _start[1].replace(/\D/g, "");
    var endHour = _end[0].replace(/\D/g, "");
    var endMin = _end[1].replace(/\D/g, "");
    sectionStart.setHours(startHour, startMin, 0, 0);
    sectionEnd.setHours(endHour, endMin, 0, 0);

    //for each class in the currLoad
    for (let i = 0; i < currLoad.length; i++) {
      //compSection is the current section we are comparing the new section against
      var compSection = currLoad[i];
      var compSectionDays = compSection["Days"];
      var matchingDay = false;

      //check if any days collide
      for (let j = 0; j < compSectionDays.length; j++) {
        if (sectionDays[j] == compSectionDays[j] && compSectionDays[j] != "-") {
          matchingDay = true;
          break;
        }
      }

      //only need to check times if dates collide (by dates I mean days of week)
      if (matchingDay) {
        //get compared section time
        var compSectionTime = compSection["Time"];
        var compSectionStart = new Date();
        var compSectionEnd = new Date();
        var comp_t = compSectionTime.split("-");
        var comp_start = comp_t[0].split(":");
        var comp_end = comp_t[1].split(":");
        var compStartHour = comp_start[0].replace(/\D/g, "");
        var compStartMin = comp_start[1].replace(/\D/g, "");
        var compEndHour = comp_end[0].replace(/\D/g, "");
        var compEndMin = comp_end[1].replace(/\D/g, "");
        compSectionStart.setHours(compStartHour, compStartMin, 0, 0);
        compSectionEnd.setHours(compEndHour, compEndMin, 0, 0);

        //still not sure if these conditionals are correct but seem stable for now
        //check if times collide
        if (
          compSectionStart <= sectionStart &&
          sectionStart <= compSectionEnd
        ) {
          return false;
        }
        if (
          sectionStart <= compSectionStart &&
          compSectionStart <= sectionEnd
        ) {
          return false;
        }
        //you have two two sections to compare each has their own start and finish time
        //does class2 start before class1 ends? BAD
        //does class2 start after class1 ends? GOOD
        //does class1 start before class2 ends? BAD
        //does class1 start after class2 ends? GOOD
      }
    }
    return true;
  }

  checkCourseLoad() {
    const { courseLoad } = this.state;
    const courseLoadLength = Object.keys(courseLoad).length;
    var initValidLoad = new Array();
    //initialize valid load with just the first class
    if (initValidLoad.length == 0 && courseLoadLength > 0) {
      var firstCourseName = Object.keys(courseLoad)[0];
      var firstCourseSections = courseLoad[firstCourseName]["Sections"];
      for (let j = 0; j < firstCourseSections.length; j++) {
        var newPossibility = [];
        newPossibility.push(firstCourseSections[j]);
        initValidLoad.push(newPossibility);
      }
    }
    for (let i = 1; i < courseLoadLength; i++) {
      var currClassName = Object.keys(courseLoad)[i];
      var currClassSections = courseLoad[currClassName]["Sections"];
      var newLoad = [];
      for (let k = 0; k < currClassSections.length; k++) {
        for (let m = 0; m < initValidLoad.length; m++) {
          var loadHolder = initValidLoad[m].slice(0);
          if (this.checkCourseAvail(loadHolder, currClassSections[k])) {
            loadHolder.push(currClassSections[k]);
            newLoad.push(loadHolder);
          }
        }
      }
      initValidLoad = newLoad;
    }
    this.setState({ validLoad: initValidLoad });
  }

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
    // if (this.state.query != "") {
    //   results.push(
    //     this.state.bigData["artsci"]["AMERICAN CULTURE STUDIES(L98)"][
    //       this.state.query
    //     ]
    //   );
    // }
    const { query } = this.state;
    const { bigData } = this.state;
    if (this.state.query != "") {
      if (bigData["mappings"][query] != null) {
        const mappingDir = bigData["mappings"][query];
        const mappingDirLength = Object.keys(mappingDir).length;
        for (let i = 0; i < mappingDirLength; i++) {
          var currClassName = Object.keys(mappingDir)[i];
          var currMapping = bigData["mappings"][query][currClassName];
          var currClassObject =
            bigData[currMapping["School Division"]][currMapping["Department"]][
              currMapping["Course Number"]
            ];
          results.push(currClassObject);
        }
      }
    }
    this.setState({ results });
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

  renderValidLoad = () => {
    const { validLoad } = this.state;
    return (
      <div>
        <p>
          There are {validLoad.length} different course combinations for the
          currently selected schedule!
        </p>
      </div>
    );
  };

  renderSearchResults = () => {
    const { results } = this.state;
    if (results.length) {
      return (
        <div>
          {results.map((result) => {
            return (
              <div>
                <h1>
                  {result["Course Number"]}: {result["Course Name"]}
                </h1>
                {/* will need to pass more info up from button to correctly identify classs
                can we pass whole object???? */}
                <button name={result["Course Number"]} onClick={this.addCourse}>
                  Add course
                </button>
                {/* {result["Sections"].map((section) => {
                  return (
                    <p>
                      {section["Time"]}: {section["Days"]}
                    </p>
                  );
                })} */}
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
      <div class="row">
{this.renderSearchResults()}
        <h1>Current Courses Selected</h1>
        {this.renderCourseLoad()}
        {this.renderValidLoad()}
      </div>
      <div class="row">
        <div class="col-4">
        <input
          type="text"
          id="search-input"
          placeholder="Search..."
          onChange={this.handleOnInputChange}
        />
        <button onClick={this.performSearch}>Search by title</button>
        </div>
      </div>
      </div>
    );
  }
}

export default function search() {
  return <SearchElement />;
}
