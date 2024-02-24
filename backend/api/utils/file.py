# ファイル操作をするツール群

import os
import shutil
from django.conf import settings

def checkDirName(dirname, root_path) -> bool:
    '''
        ROOT_PATH内のファイルを全て取得
        ディレクトリ、ファイルが混在しているため、osモジュールのisdirを使いディレクトリのみリスト化
        存在していたらtrueを返す
        なかったらfalse
    '''

    dirList = []
    for directory in os.listdir(root_path):
        if os.path.isdir(os.path.join(root_path, directory)):
            dirList.append(directory)
    if dirname in dirList:
        return True
    else:
        return False

def checkFileName(filename, path) -> bool:
    fileList = []
    print(path)
    for file in os.listdir(path):
        if not os.path.isdir(os.path.join(path, file)):
            fileList.append(file)
    
    
    if filename in fileList:
        return True
    else:
        return False

def mkdir(dirname, ctg) -> bool:
    '''
        ページ名(課題, グループ名)でディレクトリを作成する
        ディレクトリが存在していた場合はfalse
    '''
    spl = dirname.split('/')
    if len(spl) > 1:
        pages = spl
        dirname = spl.pop(-1)
        ROOT_PATH = f'{settings.MEDIA_ROOT}/{ctg}/{pages[0]}/'
    else:
        ROOT_PATH = f'{settings.MEDIA_ROOT}/{ctg}/'
    PAGES_PATH = f'{ROOT_PATH}{dirname}/'
    if not checkDirName(dirname, ROOT_PATH):
        os.mkdir(PAGES_PATH)
        return True
    else:
        return False

def renameDir(dirname, oldname, ctg) -> bool:
    spl = dirname.split('/')
    if len(spl) > 1:
        pages = spl
        dirname = spl.pop(-1)
        ROOT_PATH = f'{settings.MEDIA_ROOT}/{ctg}/{pages[0]}/'
    else:
        ROOT_PATH = f'{settings.MEDIA_ROOT}/{ctg}/'

    NEW_PAGES_PATH = f'{ROOT_PATH}{dirname}/'
    OLD_PAGES_PATH = f'{ROOT_PATH}{oldname}/'
    if not checkDirName(dirname, ROOT_PATH):
        os.rename(OLD_PAGES_PATH, NEW_PAGES_PATH)
        return True
    else:
        return False


def mkdirToSavefile(dirname, file,  ctg, name=None) -> bool:
    '''
        ページ名(課題, グループ名)でディレクトリを作成し、ファイルを保存するツール
        ディレクトリが無い場合はディレクトリ作成後、ファイル保存
        ディレクトリがすでに存在する場合は保存のみを行う
    '''    
    spl = dirname.split('/')
    print(spl)
    if len(spl) > 1:
        pages = spl
        dirname = spl.pop(-1)
        ROOT_PATH = f'{settings.MEDIA_ROOT}/{ctg}/{pages[0]}/'
    else:
        ROOT_PATH = f'{settings.MEDIA_ROOT}/{ctg}/'

    PAGES_PATH = f'{ROOT_PATH}{dirname}/'
    FILENAME = ''
    if not checkDirName(dirname, ROOT_PATH):
        os.mkdir(PAGES_PATH)
    if name is None:
        FILENAME = file.name
    else:
        FILENAME = name 

    if not checkFileName(FILENAME, PAGES_PATH):
        file_path = os.path.join(PAGES_PATH, FILENAME)
        with open(file_path, 'wb+') as d:
            for ch in file.chunks():
                d.write(ch)
        # 作成できた場合はtrue
        return True
    else:
        # 同じ名前がありできなかった場合はfalse
        return False
    
def deleteFile(dirname=None, filename=None, ctg=None) -> bool:
    '''
        指定されたファイルを削除する
        ない場合はfalse
    '''
    ROOT_PATH = f'{settings.MEDIA_ROOT}/{ctg}/'
    if dirname:        
        PAGES_PATH = f'{ROOT_PATH}{dirname}/'
    else:
        PAGES_PATH = f'{ROOT_PATH}'
    if checkFileName(filename=filename, path=PAGES_PATH):
        os.remove(f'{PAGES_PATH}{filename}')
        return True
    else:
        return False

def deleteDir(dirname, ctg) -> bool:
    '''
        指定されたディレクトリを削除する
        ない場合はfalse
    '''
    spl = dirname.split('/')
    if len(spl) > 1:
        pages = spl
        dirname = spl.pop(-1)
        ROOT_PATH = f'{settings.MEDIA_ROOT}/{ctg}/{pages[0]}/'
    else:
        ROOT_PATH = f'{settings.MEDIA_ROOT}/{ctg}/'
    PAGES_PATH = f'{ROOT_PATH}{dirname}/'
    if checkDirName(dirname=dirname, root_path=ROOT_PATH):
        shutil.rmtree(PAGES_PATH)
        return True
    else:
        return False

def getFileList(dirname, ctg) -> list:

    ROOT_PATH = f'{settings.MEDIA_ROOT}/{ctg}/'
    PAGES_PATH = f'{ROOT_PATH}{dirname}/'
    fileList = []
    for file in os.listdir(PAGES_PATH):
        if not os.path.isdir(os.path.join(PAGES_PATH, file)):
            fileList.append(file)
    
    return fileList