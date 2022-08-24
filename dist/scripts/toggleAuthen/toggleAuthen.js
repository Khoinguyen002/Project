$(function () {
  function toggleSignIn_Up() {
    const logInForm = $("#login");
    const signUpForm = $("#signup");
    $("#login .form-question-link").click(function () {
      signUpForm.fadeIn();
      logInForm.hide();
    });

    $("#signup .form-question-link").click(function () {
      logInForm.fadeIn();
      signUpForm.hide();
    });
    signUpForm.hide();
  }
  toggleSignIn_Up();
});
