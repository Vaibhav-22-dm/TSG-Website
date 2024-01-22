from django.db.models import fields
from rest_framework import serializers
from .models import *


class HallNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = HallOfResidence
        fields = ('name', 'id',)

class SocNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocOrResearchGroup
        fields = ('name', 'id',)

class DepartmentNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ('name', 'id',)


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'
        
class MyUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        # fields = '__all__'
        exclude = ('password', 'is_active', 'date_joined',
                   'is_staff', 'otp_sent_time', 'otp')

    def to_representation(self, instance):
        self.fields['hall'] = HallNameSerializer(read_only=True)
        self.fields['department'] = DepartmentSerializer(read_only=True)
        return super(MyUserSerializer, self).to_representation(instance)


class HallOfResidencesSerializer(serializers.ModelSerializer):
    class Meta:
        model = HallOfResidence
        fields = '__all__'
    
    def to_representation(self, instance):
        self.fields['warden'] = FacultySerializer(
            read_only=True
        )
        self.fields['awarden'] = FacultySerializer(
            read_only=True, many=True
        )
        return super(HallOfResidencesSerializer, self).to_representation(instance)


class SocOrResearchGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocOrResearchGroup
        fields = '__all__'

class postContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ('first_name', 'middle_name', 'last_name', 'email', 'personal_mail', 'phone', 'profile_pic')

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'


class GrievanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grievance
        fields = '__all__'


class InterIITSerializer(serializers.ModelSerializer):
    class Meta:
        model = InterIIT
        fields = '__all__'


class CDCProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CDCProfile
        fields = '__all__'


class GeneralChampionshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeneralChampionship
        fields = '__all__'


class FacultySerializer(serializers.ModelSerializer):
    class Meta:
        model = Faculty
        fields = '__all__'
        
    def to_representation(self, instance):
        self.fields['department'] = DepartmentNameSerializer(
            read_only=True, many=True)
        return super(FacultySerializer, self).to_representation(instance)


class AchievementSerializer(serializers.ModelSerializer):
    type=TagSerializer(read_only=True, many=True)
    class Meta:
        model = Achievement
        fields = '__all__'


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Posts
        fields = '__all__'
    def to_representation(self, instance):
        self.fields['hall'] = HallNameSerializer(
            read_only=True)
        self.fields['society'] = SocNameSerializer(
            read_only=True)
        self.fields['user'] = postContactSerializer(
            read_only=True)
        return super(PostSerializer, self).to_representation(instance)


class NotableAlumniSerializer(serializers.ModelSerializer):
    class Meta:
        model = NotableAlumni
        fields = '__all__'


class NewsSerializer(serializers.ModelSerializer):
    tags=TagSerializer(read_only=True, many=True)
    class Meta:
        model = News
        fields = '__all__'





class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = '__all__'


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'
    def to_representation(self, instance):
        self.fields['phySem'] = SubjectSerializer(
            read_only=True, many=True)
        self.fields['chemSem'] = SubjectSerializer(
            read_only=True, many=True)
        self.fields['semThree'] = SubjectSerializer(
            read_only=True, many=True)
        self.fields['semFour'] = SubjectSerializer(
            read_only=True, many=True)
        self.fields['semFive'] = SubjectSerializer(
            read_only=True, many=True)
        self.fields['semSix'] = SubjectSerializer(
            read_only=True, many=True)
        self.fields['smSeven'] = SubjectSerializer(
            read_only=True, many=True)
        self.fields['semNine'] = SubjectSerializer(
            read_only=True, many=True)
        self.fields['semTen'] = SubjectSerializer(
            read_only=True, many=True)

        return super(CourseSerializer, self).to_representation(instance)


class StudentProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentProject
        fields = '__all__'


class QuickLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuickLink
        fields = '__all__'

class ActivityUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ('first_name', 'middle_name', 'last_name', 'user_type')
        
class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = '__all__'

    def to_representation(self, instance):
        self.fields['user'] = ActivityUserSerializer(
            read_only=True)
        return super(ActivitySerializer, self).to_representation(instance)
    
class GovernorOrFounderSerializer(serializers.ModelSerializer):
    class Meta:
        model = GovernorOrFounder
        fields = '__all__'
    def to_representation(self,instance):
        self.fields['hall'] = HallOfResidencesSerializer( read_only=True,many=True)
        self.fields['user']=MyUserSerializer(read_only=True)

class MediaFilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = MediaFiles
        fields = '__all__'

class CDCStatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CDCStats
        fields = '__all__'

class GCStatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = GCStats
        fields = '__all__'
        
        

class EventSerializer(serializers.ModelSerializer):
    tag=TagSerializer(read_only=True, many=True)
    contacts=ContactSerializer(read_only=True, many=True)
    class Meta:
        model = Event
        fields = '__all__'

    def to_representation(self, instance):
        self.fields['organiserHall'] = HallOfResidencesSerializer(
            read_only=True)
        self.fields['organiserSociety'] = SocOrResearchGroupSerializer(
            read_only=True)
        self.fields['contacts'] = postContactSerializer(
            read_only=True, many=True
        )
        return super(EventSerializer, self).to_representation(instance)

class BillReimbursementSerializer(serializers.ModelSerializer):
    class Meta:
        model = BillReimbursement
        fields = '__all__'
        
    def to_representation(self, instance):
        self.fields['event'] = EventSerializer(read_only=True)
        self.fields['socyOrRg']=SocOrResearchGroupSerializer(
            read_only=True)
        return super(BillReimbursementSerializer,self).to_representation(instance)

