# ファイル操作をするツール群

import os
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
    for file in os.listdir(path):
        if not os.path.isdir(os.path.join(path, file)):
            fileList.append(file)
    
    
    if filename in fileList:
        print('ありまあす')
        return True
    else:
        print('ないいい')
        return False


def mkdirToSavefile(dirname, file) -> bool:
    '''
        ページ名(課題, グループ名)でディレクトリを作成し、ファイルを保存するツール
        ディレクトリが無い場合はディレクトリ作成後、ファイル保存
        ディレクトリがすでに存在する場合は保存のみを行う
    '''
    ROOT_PATH = f'{settings.MEDIA_ROOT}/pages/'
    PAGES_PATH = f'{ROOT_PATH}{dirname}/'
    if not checkDirName(dirname, ROOT_PATH):
        os.mkdir(PAGES_PATH)
    
    if not checkFileName(file.name, PAGES_PATH):
        file_path = os.path.join(PAGES_PATH, file.name)
        with open(file_path, 'wb+') as d:
            for ch in file.chunks():
                d.write(ch)
        # 作成できた場合はtrue
        return True
    else:
        # 同じ名前がありできなかった場合はfalse
        return False
    
def deleteFile(dirname=None, filename=None) -> bool:
    '''
        指定されたファイルを削除する
        ない場合はfalse
    '''
    ROOT_PATH = f'{settings.MEDIA_ROOT}/pages/'
    PAGES_PATH = f'{ROOT_PATH}{dirname}/'
    if checkFileName(filename=filename, path=PAGES_PATH):
        os.remove(f'{PAGES_PATH}{filename}')
        return True
    else:
        return False



    