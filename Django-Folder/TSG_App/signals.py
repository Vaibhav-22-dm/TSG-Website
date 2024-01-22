from django.db.models.signals import post_save,post_delete,pre_save,pre_delete
from django.utils.translation import activate
from .models import *
from django.apps import apps



# def ModelCreateUpdate(sender, instance, created, **kwargs):
#     print(sender,instance,created,kwargs)
#     if created==True:
#         # activity=Activity(user=instance.user,type='Create',modelName=sender.__name__,)
#         print('created')
        
#     else:
#         print('updated')
        
        
# def ModelDelete(sender, instance, **kwargs):
#     print('delete')
# allModel=[MyUser,Event,HallOfResidence,SocOrResearchGroup,Tag,Achievement,Grievance,Contact,Faculty,QuickLink,News,CDCProfile,Course,Subject,Department,NotableAlumni,BillReimbursement,Posts,GeneralChampionship,InterIIT,Faculty]
# # print(allModel)
# for x in allModel:
#     post_save.connect(ModelCreateUpdate, sender=x)
#     post_delete.connect(ModelDelete, sender=x)


# @receiver(post_save, sender=MyUser)
# def deleteFile(sender, instance, **kwargs):
#     if instance.pk:
#         print("deleteFile")
#         try:
#             old_avatar = MyUser.objects.get(pk=instance.pk).profile_pic
#         except MyUser.DoesNotExist:
#             return
#         else:
#             new_avatar = instance.profile_pic
#             print("interchange done")
#             if old_avatar and old_avatar.url != new_avatar.url:
#                 old_avatar.delete(save=False)
