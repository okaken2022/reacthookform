import "./styles.css";
// react-hook-formから、useFormとSubmitHandlerをimport
// SubmitHandlerは、submitイベントに関する関数の型宣言に使う
import { useForm, SubmitHandler } from "react-hook-form";

// フォームの入力値についての型定義。useFormフックを書く時に使う。
type FormInput = {
  name: string;
  age: number;
};

export default function App() {
  // useFormフックを使い、registerとhandleSubmitを取得する。
  // registerは、フォームのフィールドを登録することで、バリデーションを機能させる。
  // handleSubmitは、submitイベントの制御に関わる。
  const { register, handleSubmit, formState: { errors } } = useForm<FormInput>(
    // 初期値として、名前の入力欄に「山田太郎」・年齢の入力欄に「25」を与える
    { 
      // mode: 'onBlur', //フィールドのフォーカス状態が外れた時の bulr イベントに紐づいて、バリデーションを実行する。 
      defaultValues: { name: "山田太郎", age: 25 } });

  // submitイベントが発生して、かつバリデーションが成功した場合に実行する関数。
  // サンプルコードなので、入力値（data）をコンソール出力するだけの処理を用意。
  const onSubmit: SubmitHandler<FormInput> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        名前
        <input {...register("name", { required: true })} />
      </label>
      {/* 未入力の場合は、バリデーションが失敗してエラーになる */}
      {/* erros.nameが値が入る（undefind）ので、右辺のpタグが評価される */}
      {errors.name && <p className="error">名前欄の入力は必須です</p>}
      <label>
        年齢
        <input
          type="number"
          {...register("age", {
            // バリデーションごとにエラーメッセージを設定する場合は、オブジェクト形式でvalueとmessageを設定する
            required: { value: true, message: "年齢欄の入力は必須です" },
            min: { value: 0, message: "入力できる最小値は0です" },
            max: { value: 150, message: "入力できる最大値は150です" }
          })}
        />
        歳
      </label>
      {/* errors.age.messageを参照すると、バリデーションが失敗した項目のメッセージが取得できる */}
      {errors.age && <p className="error">{errors.age.message}</p>}
      <button>送信する</button>
    </form>
  );
}