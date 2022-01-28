# Smart React Hook Form
비슷한 포멧으로 구성된 입력/수정 폼을 구성하는 컴포넌트들을 react-hook-form library를 이용해서 구성했습니다.

### Description
[react-hook-form | Smart Form Component](https://react-hook-form.com/advanced-usage#SmartFormComponent) 방식으로 작성되었습니다.
Form 내에서 중복적인 Props 전달을 피하고, 생산성을 높이기 위한 폼 작성에 집중했습니다.

### Dependency
[react-hook-form](https://react-hook-form.com/)

### Components
- Form : 폼
- FormButton : 버튼
- FormCheckbox : 체크박스
- FormNumber : 숫자
- FormSelect : 타입 / 셀렉터 
- FormTextField : 텍스트

### Validation
각 컴포넌트를 선언할 때에 `rules`에 유효성 검증을 위한 정보를 적어야한다.

기본적으로 `rules`의 object 형식은 [HTML standard for form validation](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Form_validation) 을 따른다.

`<FormTextField name='test' label='테스트' rules={{ required: true }}/>`

### 사용 방법
```
// props.initials : 초기화할 데이터
export const Test = (props) => {
    const methods = useForm<FormValues>({ defaultValues: props.initials });
    
    const onSubmit = (data) => console.log(data);
    const onError = (err) => console.log(err);
    
    return <Form onSubmit={onSubmit} onError={onError}>
        <FormTextField name={'firstName'} label={'성'}/>
        <FormTextField name={'lastName'} label={'이름'}/>
        <FormTextField name={'title.ko'} label={'제목 (한글)'}/>
        <FormTextField name={'title.en'} label={'제목 (영어)'}/>
        <FormNumber name={'age'} label={'나이'}/>
        <FormSelect name={'gender'} label={'성별'} options={Object.values(Gender)}/>
    </Form>
}

type FormValues = {
    firstName: string,
    lastName: string,
    title: NestedValue<Description>,
    age: number,
    isNew: boolean,
    gender: Gender,
}

interface Description {
    ko: string;
    en: string;
}

enum Gender {
    FEMALE = 'female',
    MALE = 'male',
}
```

- NestedValue : `Object`을 `react hook form` 에서 읽을 수 있도록 변환
