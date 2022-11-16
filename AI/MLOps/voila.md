## Voila
Dashboard를 제작하기 위한 도구

### Voila
#### 설치
```
$ pip install voila
```

#### nbextension
```
$ voila --enable_nbextensions=True
$ jupyter notebook --VoilaConfiguration.enable_nbextensions=True
```

#### 코드 가시화
```
$ voila "voila.ipynb" --strip_sources=False
```

#### Voila Tip
- Voila는 유저별로 새로운 Notebook Kernel을 실행시키는 구조
- Voila 노트북을 사용하지 않을 때 자동으로 종료해야 함
- cull
  - cull_interval: idle 커널을 확인할 간격(초)
  - cull_idle_timeout: 커널을 idle 상태로 판단할기준(초); 이 시간동안 이벤트가 없으면 idle로 판단
- Cell 타임아웃 제한
  - 아무 설정을 하지 않을 경우 하나의 cell이 30초 이상 진행되면 Timeout Error 발생
  - 무거운 연산(전처리, 예측 등)에서 이슈
  - Voila 실행 시 인자를 주어서 타임아웃 제한 시간을 연장


- cull 간격 및 타임아웃 설정
```
$ voila "voila.ipynb" --MappingKernelManager.cull_interval=60 --MappingKernelManager.cull_idle_timeout=300
```

- Cell 타임아웃 연장
```
$ voila --ExecutePreprocessor.timeout=180
```
  
  - Jupyter Notebook 설정
    ```
    $ jupyter notebook --executePreprocessor.timeout=180
    ```


### IPywidget
Interactive한 효과 제공하는 Notebook 프로젝트
- display: Python object를 보여주는 함수
- import
    ```python
    import ipywidgets as widgets
    from IPython.display import display
    ```
-Slider Widget
  - IntSlider: 정수형 슬라이더
    - value: Default 값
    - step: 한 번에 이동할 단계
    - orientation: 수직, 수평 설정
    - description: 슬라이더의 label
      ```python
      horizontal_slider=widgets.Intslider(
          value=7, 
          min=0, 
          max=10, 
          step=1, 
          orientation='horizontal',
          description="Value:",
      )
      display(horizontal_slider)
      ```
      ```python
      vertical_slider=widgets.Intslider(
          value=1,
          min=0,
          max=3, 
          step=1, 
          orientation='vertical',
          description="Value:",
      )
      display(horizontal_slider)
      ```
  - FloatSlider: 실수형 슬라이더
  - IntRangeSlider: 범위 지정 슬라이더
- Text Widget: Slider가 아닌 Input 입력
  - BoundedIntText: 범위가 주어진 text
      ```python
      widgets.BoundedIntText(
          value=7,
          min=0,
          max=10,
          step=1,
          description="Text:",
          disabled=False
      )
      ```
      IntText
      ```python
      widgets.IntText(
          value=7,
          description='Any:',
          disabled=False
      )
      ```
  - Text
    ```python
    widgets.Text(
        value="Hello World",
        placeholder="Type something"
        description="String:"

    )
    ```
  - Textarea
    ```python
    widgets.Textarea(
        value="Hello World",
        placeholder="Type something"
        description="String:"

    )
    ```
  - Password
    ```python
    widgets.Password(
        value="password",
        placeholder="Enter password"
        description="Password:"

    )
    ```

- Boolean Widget: True/False를 표시할 수 있는 Widget
  - ToggleButton
    - button_style: 버튼의 스타일
    - icon: 사용하는 아이콘
    ```python
    widgets.ToggleButton(
        value=False,
        description="Click me",
        button_style='', # 'success', 'info', 'warning', 'danger', ''
        tooltip='Description',
        icon='check' # Fontawesome (https://fontawesome.com/icons)
    )
    ```

  - CheckBox
    - indent: 들여쓰기 여부
    ``` python
    widgets.Checkbox(
        value=False,
        description="Check me",
        indent=False
    )
    ```

- Selection Widget: 선택할 수 있는 Widget
  - Dropdown
    ```python
    widgets.Dropdown(
        options=['1', '2', '3'],
        value='2',
        description="Number:",
        disabled=False,
    )
    ```
    
    ```python
    widgets.Dropdown(
        options=[("One", 1), ("Two", 2), ("Three", 3)],
        value='2',
        description="Number:",
        disabled=False,
    )
    ```

  - RadioButtons
    ```python
    widgets.RadioButtons(
        options=["Pepperoni", "pineapple", "anchovies"],
        description="Topping:",
    )
    ```
- Upload Widget: 파일을 업로드 하는 Widget

    ```python
    widgets.FileUpload(
        accept='', # 확장자
        multiple=False # 단일 파일 vs 복수 파일
    )

- Image Widget: Image를 보여주는 Widget
    ```python
    file=open('image.png', 'rb')
    image = file.read()
    widgets.Image(
        value=image,
        format='png',
        width=300,
        height=400,
    )
    ```
- Data Picker Widget: Date를 선택하는 Widget (Date, Time, Datetime 등 존재)
    ```python
    widgets.DatePicker(
        description="Pick a Date",
        disabled=False
    )
    ```

- Widget Events: 특정 이벤트에 대한 기능을 제공하는 Widget
  - on_click: 버튼이 클릭되었을 때, 어떤 함수가 동작하길 원하는 경우
    ```python
    button = widgets.Button(description="Click Me!")
    output = widgets.Output()

    display(button, output)

    def on_button_clicked(button):
        with output:
            print("Hello world!")
    
    button.on_click(on_button_clicked)
    ```

  - observe: 위젯의 값이 변경되는 것을 감지하여 특정 함수를 실행
    ```python
    
    int_range = widgets.IntSlider()
    output = widgets.Output()

    display(int_rage, output)

    def on_value_change(change):
        with output:
            print(change['new'])
    
    int_range.observe(on_value_change, names='value')
    ```
- Interact Decorator: @interact 데코레이터를 사용하여 UI 컨트롤러 생성
  - fixed: UI에서 배제
    ``` python
    from ipywidgets import interact, fixed
    
    @interact(x=True, y=1.0, z=fixed(10))
    def g(x, y, z):
        return (x, y, z)
    ```

- Layout(HBox, VBox): 위젯의 레이아웃을 구성
    ```python
    slider = widgets.IntSlider(description="$x$", value=1)
    widgets.VBox([slider])
    ```
    ```python
    slider1 = widgets.IntSlider(description="$x$", value=1)
    slider2 = widgets.IntSlider(description="$y$", value=2)
    widgets.VBox([slider1, slider2])
    ```
    ```python
    from ipywidgets import Button, HBox, VBox

    words  ['correct', 'horse', 'battery', 'staple']
    items = [Button(description=w) for w in words]
    left_box = VBox([items[0], items[1]])
    right_box = VBox([items[2], items[3]])
    HBox([left_box, right_box])
    ```
    