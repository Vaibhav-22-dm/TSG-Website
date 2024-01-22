from email.policy import default
from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser, PermissionsMixin
)
from django.db.models import query
from django.db.models.fields.related import ForeignKey
from django.utils import timezone
from django.contrib.auth.hashers import make_password
from django.apps import apps
from django.contrib import auth
from django.utils.translation import gettext_lazy as _
import datetime
from django.dispatch import receiver
from django.db.models.signals import post_save, post_delete


class MyUserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        """
        Create and save a user with the given username, email, and password.
        """
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        # Lookup the real model class from the global app registry so this
        # manager method can be used in migrations. This is fine because
        # managers are by definition working on the real model.
        GlobalUserModel = apps.get_model(
            self.model._meta.app_label, self.model._meta.object_name)
        user = self.model(email=email, **extra_fields)
        user.password = make_password(password)
        user.save(using=self._db)
        return user

    def create_user(self,  email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self,  email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)

    def with_perm(self, perm, is_active=True, include_superusers=True, backend=None, obj=None):
        if backend is None:
            backends = auth._get_backends(return_tuples=True)
            if len(backends) == 1:
                backend, _ = backends[0]
            else:
                raise ValueError(
                    'You have multiple authentication backends configured and '
                    'therefore must provide the `backend` argument.'
                )
        elif not isinstance(backend, str):
            raise TypeError(
                'backend must be a dotted import path string (got %r).'
                % backend
            )
        else:
            backend = auth.load_backend(backend)
        if hasattr(backend, 'with_perm'):
            return backend.with_perm(
                perm,
                is_active=is_active,
                include_superusers=include_superusers,
                obj=obj,
            )
        return self.none()

class Department(models.Model):
    name = models.CharField(max_length=150, null=True, blank=True)
    about = models.TextField(null=True, blank=True)
    hod_message = models.TextField(null=True, blank=True)
    labs = models.TextField(null=True, blank=True)
    achievements = models.TextField(null=True, blank=True)
    coverPhoto = models.ImageField(
        upload_to='departments/', null=True, blank=True)

    def __str__(self):
        return self.name


class Faculty(models.Model):

    WORKING_STATUS = (
        ('Working', 'Working'),
        ('Not Working', 'Not Working'),
    )

    firstName = models.CharField(max_length=150, null=True, blank=True)
    middleName = models.CharField(max_length=150, null=True, blank=True)
    lastName = models.CharField(max_length=150, null=True, blank=True)
    researchArea = models.TextField(null=True, blank=True)
    # projects = models.TextField(null=True, blank=True)
    education = models.TextField(null=True, blank=True)
    workingStatus = models.CharField(
        max_length=20, choices=WORKING_STATUS, default='Working')
    designation = models.CharField(max_length=200, null=True, blank=True)
    department = models.ManyToManyField(Department, blank=True)
    profilePic = models.ImageField(
        upload_to='faculties/', null=True, blank=True)
    cvOrWesiteLink = models.URLField(null=True, blank=True)
    instiPageLink = models.URLField(null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    phone = models.BigIntegerField(null=True, blank=True)
    responsibilities = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.firstName + ' ' + self.lastName


class HallOfResidence(models.Model):

    about = models.TextField(null=True, blank=True)
    coverPhoto = models.ImageField(
        upload_to='hallOfResidences/', null=True, blank=True)
    messMenu = models.TextField(null=True, blank=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    strength = models.CharField(max_length=100, null=True, blank=True)
    accomMatrix = models.TextField(null=True, blank=True)
    amenities = models.TextField(blank=True, null=True)
    officePhone = models.CharField(max_length=100, null=True, blank=True)
    securityPhone = models.CharField(max_length=100, null=True, blank=True)
    messPhone = models.CharField(max_length=100, null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    address = models.TextField(null=True, blank=True)
    motto = models.TextField(null=True, blank=True)
    gender = models.CharField(max_length=150, null=True, blank=True)
    websiteLink = models.URLField(null=True, blank=True)
    warden = models.ForeignKey(Faculty, null=True, blank=True, on_delete=models.SET_NULL, related_name='warden')
    awarden = models.ManyToManyField(Faculty, blank=True)

    def __str__(self):
        return self.name


class SocOrResearchGroup(models.Model):

    STATUS = (
        ('Active', 'Active'),
        ('Inactive', 'Inactive')
    )

    TYPE = (
        ('Society', 'Society'),
        ('Research Group', 'Research Group'),
    )

    CATEGORY = (
        ('Social', 'Social'),
        ('Cultural', 'Cultural'),
        ('Arts', 'Arts'),
        ('Entrepreneurship', 'Entrepreneurship'),
        ('Technology', 'Technology')
    )

    parentBody = models.CharField(max_length=50, null=True, blank=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    status = models.CharField(max_length=50, choices=STATUS, default='Active')
    tagline = models.TextField(null=True, blank=True)
    about = models.TextField(null=True, blank=True)
    logo = models.ImageField(
        upload_to='socOrResearchGroup/', null=True, blank=True)
    coverPhoto = models.ImageField(
        upload_to='socOrResearchGroup/', null=True, blank=True)
    facebookLink = models.URLField(max_length=200, null=True, blank=True)
    instagramLink = models.URLField(max_length=200, null=True, blank=True)
    twitterLink = models.URLField(max_length=200, null=True, blank=True)
    linkedinLink = models.URLField(max_length=200, null=True, blank=True)
    githubLink = models.URLField(max_length=200, null=True, blank=True)
    youtubeLink = models.URLField(max_length=200, null=True, blank=True)
    websiteLink = models.URLField(max_length=200, null=True, blank=True)
    type = models.CharField(
        max_length=200, choices=TYPE, null=True, blank=True)
    category = models.CharField(
        max_length=200, choices=CATEGORY, null=True, blank=True)
    phone = models.CharField(max_length=20, null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    people = models.TextField(null=True, blank=True)
    
    def __str__(self):
        return self.name

class MyUser(AbstractBaseUser, PermissionsMixin):

    # DEPARTMENT_CHOICES = (
    #     ('AE', 'Aerospace Engineering'),
    #     ('AFE', 'Agriculture And Food Engineering'),
    #     ('ARP', 'Architecture and Regional Planning'),
    #     ('BT', 'Biotechnology'),
    #     ('CHE', 'Chemical Engineering'),
    #     ('CH', 'Chemistry'),
    #     ('CE', 'Civil Engineering'),
    #     ('CSE', 'Computer Science and Engineering'),
    #     ('EE', 'Electrical Engineering'),
    #     ('ECE', 'Electronics and Electrical Communication'),
    #     ('FE', 'Financial Engineering'),
    #     ('GG', 'Geology And Geophysics'),
    #     ('HSS', 'Humanities And Social Sciences'),
    #     ('ISE', 'Industrial And Systems Engineering'),
    #     ('MA', 'Mathematics'),
    #     ('ME', 'Mechanical Engineering'),
    #     ('MME', 'Metallurgical And Materials Engineering'),
    #     ('MIE', 'Mining Engineering'),
    #     ('OENA', 'Ocean Engineering And Naval Architecture'),
    #     ('PH', 'Physics')
    # )
    USER_TYPE = (
        ('student', 'student'),
        ('governor', 'governor'),
        ('admin', 'admin'),
        ('tsgbearer', 'tsgbearer'),
    )
    YEAR_CHOICES = ((1,1),(2,2),(3,3),(4,4),(5,5))
    #COURSE_CHOICES = (('',''),('',''))

    #EAA_CHOICES = (('',''),('',''))

    email = models.EmailField(_('email address'), unique=True, null=True,blank=True)
    personal_mail = models.EmailField(blank=True, null=True)
    first_name = models.CharField(_('first name'), max_length=150, blank=True, null=True)
    middle_name = models.CharField(
        _('middle name'), max_length=150, blank=True, null=True)
    user_type = models.CharField(
        max_length=50, choices=USER_TYPE, default='student')
    last_name = models.CharField(
        _('last name'), max_length=150, blank=True, null=True)
    roll_no = models.CharField(max_length=150, blank=True, null=True)
    phone = models.CharField(max_length=150, blank=True, null=True)
    hall = models.ForeignKey(
        HallOfResidence, on_delete=models.SET_NULL, blank=True, null=True)
    department = models.ForeignKey(
        Department, on_delete=models.SET_NULL, blank=True, null=True)
    course = models.CharField(max_length=150, blank=True, null=True)
    profile_pic = models.ImageField(upload_to='user/', blank=True, null=True)
    year = models.IntegerField(choices=YEAR_CHOICES,blank=True, null=True)
    batch = models.IntegerField(default=datetime.date.today().year, null=True)
    eaa = models.CharField(max_length=150, blank=True, null=True)
    otp = models.CharField(max_length=150, null=True, blank=True)
    otp_sent_time = models.DateTimeField(null=True, blank=True)
    about = models.TextField(blank=True, null=True)
    cv = models.FileField(upload_to='user/cv/', blank=True, null=True)
    is_staff = models.BooleanField(
        _('staff status'),
        default=False,
        help_text=_(
            'Designates whether the user can log into this admin site.'),
    )
    is_active = models.BooleanField(
        _('active'),
        default=True,
        help_text=_(
            'Designates whether this user should be treated as active. '
            'Unselect this instead of deleting accounts.'
        ),
    )
    date_joined = models.DateTimeField(_('date joined'), default=timezone.now)

    objects = MyUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def clean(self):
        super().clean()
        self.email = self.__class__.objects.normalize_email(self.email)

    def get_full_name(self):
        """
        Return the first_name plus the last_name, with a space in between.
        """
        full_name = '%s %s' % (self.first_name, self.last_name)
        return full_name.strip()

    def get_short_name(self):
        """Return the short name for the user."""
        return self.first_name

    def __str__(self):
        return self.email

class Tag(models.Model):

    name = models.CharField(max_length=150, null=True, blank=True)
    description = models.CharField(max_length=200, null=True, blank=True)
    user = models.ForeignKey(MyUser, null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return self.name


class Achievement(models.Model):

    CATEGORY_CHOICES = (
        ('Tech', 'Technology'),
        ('SoCult', 'Social and Culture'),
        ('S&G', 'Sports and Games'),
        ('SW', 'Student Welfare'),
        ('Others', 'Others')
    )

    user = models.ForeignKey(
        MyUser, on_delete=models.SET_NULL, null=True, blank=True)
    supDoc = models.FileField(upload_to='achivements/', null=True, blank=True)
    desc = models.CharField(max_length=200, null=True, blank=True)
    # type = models.CharField(
    #     max_length=100, choices=CATEGORY_CHOICES, default='Others')
    type=models.ManyToManyField(Tag, blank=True)
    date = models.DateField(blank=True, null=True)

    def __str__(self):
        return self.desc


class Grievance(models.Model):
    VERIFICATION_CHOICES = (
        ('RESOLVED', 'RESOLVED'),
        # ('DECLINE', 'DECLINE'),
        ('PENDING', 'PENDING')
    )
    user = models.ForeignKey(
        MyUser, on_delete=models.SET_NULL, null=True, blank=True)
    rollNo = models.CharField(max_length=10, null=True, blank=True)
    tags = models.ManyToManyField(Tag, blank=True)
    desc = models.TextField(null=True, blank=True)
    subject = models.CharField(max_length=150, null=True, blank=True)
    # attemptNumber = models.IntegerField(blank=True, null=True)
    supDoc = models.FileField(upload_to='greviences/', null=True, blank=True)
    type=models.CharField(max_length=100, null=True, blank=True)
    status = models.CharField( max_length=30, choices=VERIFICATION_CHOICES, default='PENDING')
    feedback = models.TextField(null=True, blank=True)
    date=models.DateField(default=datetime.date.today(),blank=True, null=True)
    def __str__(self):
        return self.subject


class Contact(models.Model):

    name = models.CharField(max_length=100, null=True, blank=True)
    email = models.EmailField(max_length=100,  null=True, blank=True)
    phone = models.CharField(max_length=100, null=True, blank=True)
    designation = models.CharField(max_length=100, null=True, blank=True)
    profilePic = models.ImageField(
        upload_to='contacts/', null=True, blank=True)
    year = models.DateField(
        default=datetime.date.today(), null=True, blank=True)
    organization = models.CharField(max_length=200, null=True, blank=True)

    status = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self):
        return self.name + '-' + self.designation


class InterIIT(models.Model):

    EVENT_TYPE = (
        ('Sports', 'Sports'),
        ('Technical', 'Technical'),
        ('Literary', 'Literary'),
        ('Management', 'Management'),
        ('Other', 'Other')
    )

    eventName = models.CharField(max_length=50, null=True, blank=True)
    medalType = models.CharField(max_length=50, null=True, blank=True)
    instiName = models.CharField(max_length=50, null=True, blank=True)
    year = models.DateField(
        default=datetime.date.today().year, null=True, blank=True)
    typeOfEvent = models.CharField(
        max_length=20, choices=EVENT_TYPE, default='Sports')
    hostInsti = models.CharField(max_length=50, null=True)
    gender = models.CharField(max_length=150, null=True, blank=True)

    def __str__(self):
        return f"{self.eventName}-{self.medalType}-{self.instiName}"


class GeneralChampionship(models.Model):

    EVENT_TYPE = (
        ('Sports', 'Sports'),
        ('Technical', 'Technical'),
        ('Literary', 'Literary'),
        ('Management', 'Management'),
        ('Other', 'Other')
    )

    eventName = models.CharField(max_length=150, null=True, blank=True)
    points = models.IntegerField(null=True, blank=True)
    hall = models.ForeignKey(
        HallOfResidence, on_delete=models.SET_NULL, null=True, blank=True)
    year = models.DateField(
        default=datetime.date.today().year, null=True, blank=True)
    eventType = models.CharField(
        max_length=20, choices=EVENT_TYPE, default='Sports')
    gender = models.CharField(max_length=150, null=True, blank=True)

    def __str__(self):
        return f"{self.eventName}-{self.hall.name}"

class GCStats(models.Model):
    CHOICES = (
        ('sports', 'sports'),
        ('socult', 'socult'),
        ('tech', 'tech')
    )
    year = models.CharField(max_length=200, null=True, blank=True)
    eventName = models.CharField(max_length=200, null=True, blank=True)
    eventType = models.CharField(max_length=200, null=True, blank=True, choices=CHOICES)
    scoreArray = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.year + '-' + self.eventName

class Posts(models.Model):

    user = models.ForeignKey(
        MyUser, on_delete=models.SET_NULL, null=True, blank=True)
    # default post can be "admin" or "tsgBearer" or "socGovernor" naming in frontend to be done accordingly
    post = models.CharField(max_length=200, null=True, blank=True)
    tenure = models.CharField(max_length=50, null=True, blank=True)
    status = models.CharField(max_length=50, null=True, blank=True)
    rankInOrg = models.IntegerField(null=True, blank=True)
    roleAndResp = models.TextField(max_length=200, null=True, blank=True)
    society = models.ForeignKey(
        SocOrResearchGroup, on_delete=models.SET_NULL, null=True, blank=True)
    hall = models.ForeignKey(
        HallOfResidence, on_delete=models.SET_NULL, null=True, blank=True)
    body = models.CharField(max_length=200, null=True, blank=True)
    facebookLink = models.URLField(blank=True, null=True)
    linkedinLink = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.post


class Event(models.Model):
    ARCHIVE_CHOICES = (
        ('A', 'Archived'),
        ('NA', 'Not Archived')
    )
    MODE_CHOICES = (
        ('On', 'Online'),
        ('Off', 'Offline')
    )
    STATUS_CHOICES = (
        ('U', 'Upcoming'),
        ('O', 'Ongoing'),
        ('C', 'Completed')
    )

    posterImage = models.ImageField(upload_to='events/', null=True, blank=True)
    eventName = models.CharField(max_length=250, null=True, blank=True)
    report = models.FileField(upload_to='events/', null=True, blank=True)
    reportArchive = models.CharField(
        max_length=50, choices=ARCHIVE_CHOICES, default='Not Archive')
    year = models.CharField(
        default=datetime.date.today().year,max_length=20, null=True, blank=True)
    organiserSociety = models.ForeignKey(
        SocOrResearchGroup, on_delete=models.SET_NULL, null=True, blank=True)
    organiserHall = models.ForeignKey(
        HallOfResidence, on_delete=models.SET_NULL, null=True, blank=True)
    organiserBody = models.CharField(max_length=200, null=True, blank=True)
    eventDate = models.DateTimeField(auto_now=True,null=True, blank=True)
    regLink=models.URLField(blank=True, null=True)
    otherInfo = models.CharField(max_length=200, null=True,blank=True)
    contactNumber = models.CharField(max_length=20, null=True,blank=True)
    mode = models.CharField(
        max_length=20, choices=MODE_CHOICES, default='Online')
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default='Upcoming')
    tag = models.ManyToManyField(Tag, blank=True)
    regDeadline = models.DateTimeField(auto_now=True,  null=True, blank=True)
    contacts = models.ManyToManyField(MyUser, blank=True)
    about = models.TextField(null=True, blank=True)
    featured = models.BooleanField(default=False, blank=True)

    def __str__(self):
        return self.eventName


class BillReimbursement(models.Model):

    VERIFICATION_CHOICES = (
        ('Verified', 'Verified'),
        ('DECLINE', 'DECLINE'),
        ('PENDING', 'PENDING')
    )

    socyOrRg = models.ForeignKey(
        SocOrResearchGroup, on_delete=models.SET_NULL, null=True, blank=True)
    event = models.ForeignKey(
        Event, on_delete=models.SET_NULL, null=True, blank=True)
    bill = models.FileField(
        upload_to='billReimbursement/', null=True, blank=True)
    amount = models.CharField(max_length=50, null=True, blank=True)
    status = models.CharField(
        max_length=20, choices=VERIFICATION_CHOICES, default='PENDING')
    remarks = models.TextField( null=True, blank=True)
    date = models.DateTimeField(default=timezone.now())
    doubt = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.event.eventName


class NotableAlumni(models.Model):

    name = models.CharField(max_length=200, null=True, blank=True)
    about = models.TextField(null=True, blank=True)
    position = models.CharField(max_length=200, null=True, blank=True)
    batch = models.IntegerField(null=True, blank=True)
    hall = models.ForeignKey(
        HallOfResidence, on_delete=models.SET_NULL, null=True, blank=True)
    department = models.CharField(max_length=200, null=True, blank=True)
    course = models.CharField(max_length=200, null=True, blank=True)
    profilePic = models.ImageField(upload_to='alumni/', null=True, blank=True)
    companyLogo = models.ImageField(upload_to='alumni/', null=True, blank=True)

    def __str__(self):
        return self.name


class Subject(models.Model):

    name = models.CharField(max_length=150, null=True, blank=True)
    department = models.ForeignKey(
        Department, on_delete=models.SET_NULL, null=True, blank=True)
    courseCode = models.CharField(max_length=10, null=True, blank=True)
    gradeStat = models.TextField(null=True, blank=True)
    notesDriveLink = models.URLField(max_length=200, null=True, blank=True)
    pyqsDriveLink = models.URLField(max_length=200, null=True, blank=True)
    nptelPlaylist = models.URLField(max_length=200, null=True, blank=True)
    booksDriveLink = models.URLField(max_length=200, null=True, blank=True)

    def __str__(self):
        return self.courseCode + "-" + self.name


class Course(models.Model):
    name = models.CharField(max_length=150, null=True, blank=True)
    abbrv = models.CharField(max_length=150, null=True, blank=True)
    department = models.ForeignKey(
        Department, on_delete=models.SET_NULL, null=True, blank=True)
    duration = models.IntegerField(null=True, blank=True)
    phySem = models.ManyToManyField(Subject, related_name='phy', blank=True)
    chemSem = models.ManyToManyField(Subject, related_name='chem',  blank=True)
    semThree = models.ManyToManyField(
        Subject, related_name='sem3',  blank=True)
    semFour = models.ManyToManyField(Subject, related_name='sem4',  blank=True)
    semFive = models.ManyToManyField(Subject, related_name='sem5',  blank=True)
    semSix = models.ManyToManyField(Subject, related_name='sem6',  blank=True)
    semSeven = models.ManyToManyField(
        Subject, related_name='sem7',  blank=True)
    semEight = models.ManyToManyField(
        Subject, related_name='sem8',  blank=True)
    semNine = models.ManyToManyField(Subject, related_name='sem9',  blank=True)
    semTen = models.ManyToManyField(Subject, related_name='sem10',  blank=True)

    def __str__(self):
        return self.name


class CDCProfile(models.Model):

    name = models.CharField(max_length=150, null=True, blank=True)
    about = models.TextField(null=True, blank=True)
    notesDriveLink = models.URLField(max_length=200, null=True, blank=True)
    qnasDriveLink = models.URLField(max_length=200, null=True, blank=True)
    blogsLinkList = models.TextField(null=True, blank=True)
    others = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self):
        return self.name


class MediaFiles(models.Model):

    title = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(upload_to='images/', null=True, blank=True)
    socyOrRg = models.ForeignKey(
        SocOrResearchGroup, on_delete=models.SET_NULL, null=True, blank=True)
    hall = models.ForeignKey(
        HallOfResidence, on_delete=models.SET_NULL, null=True, blank=True)
    department = models.ForeignKey(
        Department, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.title


class News(models.Model):

    title = models.TextField(null=True, blank=True)
    content = models.TextField(null=True, blank=True)
    date = models.DateField(default=timezone.now, null=True)
    author = models.CharField(max_length=200, null=True, blank=True)
    tags = models.ManyToManyField(Tag, blank=True)
    image = models.ImageField(upload_to='news/', null=True, blank=True)

    def __str__(self):
        return self.title


class CDCData(models.Model):

    student_id = models.ForeignKey(
        MyUser, on_delete=models.SET_NULL, null=True, blank=True)
    companyName = models.CharField(max_length=200, null=True, blank=True)
    profile = models.CharField(max_length=200, null=True, blank=True)
    position = models.CharField(max_length=200, null=True, blank=True)
    placementDate = models.DateField(
        default=datetime.date.today, null=True, blank=True)
    domestic = models.BooleanField(default=True, blank=True)
    ctc = models.CharField(max_length=150, null=True, blank=True)

    def __str__(self):
        return self.companyName

class CDCStats(models.Model):
    year = models.CharField(max_length=200, null=True, blank=True)
    day = models.CharField(max_length=200, null=True, blank=True)
    bTech = models.TextField(null=True, blank=True)
    mTech = models.TextField(null=True, blank=True)
    dDegree = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.year + '-' + self.day

class StudentProject(models.Model):

    user = models.ForeignKey(
        MyUser, on_delete=models.SET_NULL, null=True, blank=True)
    title = models.TextField(null=True, blank=True)
    about = models.TextField(null=True, blank=True)
    link = models.URLField(null=True, blank=True)
    tag = models.ManyToManyField(Tag, blank=True)

    def __str__(self):
        return self.title


class QuickLink(models.Model):
    name = models.CharField(max_length=150, null=True, blank=True)
    link = models.URLField(null=True, blank=True)
    desc = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.link


class Activity(models.Model):

    TYPE = (
        ('Create', 'Create'),
        ('Update', 'Update'),
        ('Delete', 'Delete'),
        ('Other', 'Other')
    )

    modelName = models.CharField(max_length=200, null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    user = models.ForeignKey(
        MyUser, null=True, blank=True, on_delete=models.SET_NULL)
    type = models.CharField(max_length=200, null=True,
                            blank=True, choices=TYPE)
    remarks = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.modelName + ' - ' + self.type


class GovernorOrFounder(models.Model):
    CHOICES = (('Governor', 'Governor'), ('Founder', 'Founder'))
    user = models.ForeignKey(
        MyUser, null=True, blank=True, on_delete=models.SET_NULL)
    soc = models.ForeignKey(SocOrResearchGroup, null=True,
                            blank=True, on_delete=models.SET_NULL)
    name = models.CharField(max_length=200, null=True, blank=True)
    type = models.CharField(max_length=200, null=True,
                            blank=True, choices=CHOICES)
    facebookProfile = models.URLField(null=True, blank=True)
    linkedinProfile = models.URLField(null=True, blank=True)
    twitterProfile = models.URLField(null=True, blank=True)
    isActive = models.BooleanField(default=True, blank=True)
    year = models.DateField(null=True, blank=True)
