import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from matplotlib import rc

# 한글 폰트 설정 (예: AppleGothic)
rc('font', family='AppleGothic')

# 마이너스 폰트 깨짐 방지
plt.rcParams['axes.unicode_minus'] = False

# CSV 파일 로드
df = pd.read_csv('space.csv')

# MBTI 유형별로 몇 개의 구/군/시가 있는지 계산
mbti_counts = df['space-MBTI'].value_counts()

# 전체적인 데이터 파악
print(df.head())
print("\nMBTI 유형별 개수:")
print(mbti_counts)

# 막대 그래프로 MBTI 유형 분포 시각화
plt.figure(figsize=(10, 6))
sns.countplot(data=df, x='space-MBTI', order=mbti_counts.index, palette='Set2')
plt.title('전체 지역별 MBTI 유형')
plt.xlabel('MBTI 유형')
plt.ylabel('개수')
plt.show()

# 행정구역별 MBTI 유형 분포 시각화 (서울특별시, 부산광역시 등)
plt.figure(figsize=(12, 8))
sns.countplot(data=df, x='행정구역', hue='space-MBTI', palette='Set2')
plt.title('행정구역별 MBTI 분포')
plt.xlabel('행정구역')
plt.ylabel('개수')
plt.xticks(rotation=45)
plt.legend(title='MBTI 유형', bbox_to_anchor=(1.05, 1), loc='upper left')
plt.show()

# 고정된 색상 팔레트 설정 (space-MBTI 값에 따라)
mbti_types = df['space-MBTI'].unique()
palette = sns.color_palette('Set2', len(mbti_types))
color_map = dict(zip(mbti_types, palette))

# 행정구역별로 데이터를 그룹화
regions = df['행정구역'].unique()

# 서브플롯 생성 (3x6 그리드로 17개의 차트를 생성, 하나의 빈 칸 포함)
fig, axes = plt.subplots(3, 6, figsize=(20, 15))

# 각 행정구역별로 파이차트 생성
for i, region in enumerate(regions):
    ax = axes[i // 6, i % 6]  # 그리드 위치 계산
    region_data = df[df['행정구역'] == region]
    region_mbti_counts = region_data['space-MBTI'].value_counts()

    # 색상 적용
    colors = [color_map[mbti] for mbti in region_mbti_counts.index]
    
    ax.pie(region_mbti_counts, labels=region_mbti_counts.index, autopct='%1.1f%%', startangle=140, colors=colors)
    ax.set_title(f'{region} MBTI 분포')

# 나머지 빈 서브플롯 비우기
for j in range(i + 1, 18):
    fig.delaxes(axes.flatten()[j])

# 레이아웃 조정
plt.tight_layout()
plt.show()
