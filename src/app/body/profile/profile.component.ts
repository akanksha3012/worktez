import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NavbarHandlerService } from 'src/app/services/navbar-handler/navbar-handler.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { ApplicationSettingsService } from 'src/app/services/applicationSettings/application-settings.service';
import { ActivatedRoute } from '@angular/router';
import { MyEducationData, MyExperienceData, MyProjectData } from 'src/app/Interface/UserInterface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  componentName: string = "PROFILE"
  
  editProfileEnabled: boolean = false
  editEducationEnabled: boolean = false
  editProjectEnabled: boolean = false
  editSkillsEnabled: boolean = false
  editWorkEnabled: boolean = false
  
  educationModalMode: string
  educationModalData: MyEducationData
  workModalMode: string
  workModalData: MyEducationData
  projectModalMode: string
  projectModalData: MyProjectData

  uid: string
  photoURL: string
  displayName: string
  email: string
  aboutMe: string
  appTheme: string
  phoneNumber: string
  organizationName: string
  teamName: string
  role: string
  githubProfile: string;
  linkedInProfile: string;
  managerEmail: string;
  dateOfJoining: string;
  skills: string;
  website: string;
  username: string;
  
  educations: MyEducationData;
  experiences: MyExperienceData;
  projects: MyProjectData;

  constructor(public authService: AuthService, private route: ActivatedRoute, public navbarHandler: NavbarHandlerService, public backendService: BackendService, public applicationSettingsService: ApplicationSettingsService) { }

  ngOnInit(): void {
    this.navbarHandler.addToNavbar(this.componentName);

    this.username = this.route.snapshot.params['username'];

    this.authService.afauth.user.subscribe(data => {
      this.authService.userAppSettingObservable.subscribe(data => {
        if (data.SelectedOrgAppKey) {
          this.backendService.organizationsData.subscribe(data => {
            this.readUser();
            this.organizationName = this.backendService.getOrganizationName();
            this.applicationSettingsService.getTeamDetails(this.authService.getTeamId()).subscribe(team => {
              this.teamName = team.TeamName;
              this.managerEmail = team.TeamManagerEmail;
              if (team.TeamManagerEmail == this.email) {
                this.role = "Manager";
              } else {
                this.role = "Member";
              }
            });
          });
        }
      });
    });

  }

  editProfile() {
    this.editProfileEnabled = true;
  }

  editEducation(mode: string, educationId: number) {
    this.educationModalMode = mode;
    if(educationId >= 0){
      this.educationModalData = this.educations[educationId];
      console.log(this.educationModalData);
    } else {
      this.educationModalData = null;
    }
    this.editEducationEnabled = true;
  }

  editProject(mode: string, projectId: number) {
    this.projectModalMode = mode;
    if(projectId >= 0){
      this.projectModalData = this.projects[projectId];
    } else {
      this.projectModalData = null
    }
    this.editProjectEnabled = true;
  }

  editSkills() {
    this.editSkillsEnabled = true;
  }

  editWork(mode: string, workId: number) {
    this.workModalMode = mode;
    this.workModalData = this.experiences[workId];
    this.editWorkEnabled = true;
  }

  editProfileCompleted(data: { completed: boolean }) {
    this.editProfileEnabled = false;
  }

  editEducationCompleted(data: { completed: boolean }) {
    this.editEducationEnabled = false;
    this.readUserEducation(this.uid);
  }
  
  editWorkCompleted(data: { completed: boolean }) {
    this.editWorkEnabled = false;
    this.readUserExperience(this.uid);
  }
  
  editProjectCompleted(data: { completed: boolean }) {
    this.editProjectEnabled = false;
    this.readUserProject(this.uid);
  }
  
  editSkillsCompleted(data: { completed: boolean }) {
    this.editSkillsEnabled = false;
    this.readUser();
  }

  readUser() {
    this.displayName = this.authService.userAppSetting.displayName;
    this.email = this.authService.userAppSetting.email;
    this.uid = this.authService.userAppSetting.uid;
    this.aboutMe = this.authService.userAppSetting.AboutMe;
    this.appTheme = this.authService.userAppSetting.AppTheme;
    this.photoURL = this.authService.userAppSetting.photoURL;
    this.phoneNumber = this.authService.userAppSetting.phoneNumber;
    this.linkedInProfile = this.authService.userAppSetting.LinkedInProfile;
    this.githubProfile = this.authService.userAppSetting.GithubProfile;
    this.dateOfJoining = this.authService.userAppSetting.DateOfJoining;
    this.skills = this.authService.userAppSetting.Skills;
    // this.education = this.authService.userAppSetting.Education;
    // this.experience = this.authService.userAppSetting.Experience;
    // this.projects = this.authService.userAppSetting.Projects;
    this.website = this.authService.userAppSetting.Website;
    if (this.website.includes("https://") == false) {
      this.website = "https://" + this.website;
    }
    this.readUserEducation(this.uid);
    this.readUserExperience(this.uid);
    this.readUserProject(this.uid);
  }

  readUserEducation(uid: string) {
    console.log("Reading education data");
    this.authService.getUserEducation(uid).subscribe(eduData => {
      this.educations = eduData;
    });
  }
  
  readUserExperience(uid: string) {
    console.log("Reading experience data");
    this.authService.getUserExperience(uid).subscribe(expData => {
      this.experiences = expData;
    });
  }
  
  readUserProject(uid: string) {
    console.log("Reading Project data");
    this.authService.getUserProject(uid).subscribe(projData => {
      this.projects = projData;
    });
  }
}
