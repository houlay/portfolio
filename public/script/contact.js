$(function() {
  $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
    preventSubmit: !0,
    submitError: function(t, e, s) {},
    submitSuccess: function(t, e) {
      e.preventDefault();
      var name = $("input#name").val(),
        email = $("input#email").val(),
        phone = $("input#phone").val(),
        message = $("textarea#message").val(),
        i = name;
      i.indexOf(" ") >= 0 &&
        (firstName = name
          .split(" ")
          .slice(0, -1)
          .join(" ")),
        ($this = $("#sendMessageButton")),
        $this.prop("disabled", true),
        $.ajax({
          url: "/sendContactEmail",
          type: "POST",
          data: {
            name: name,
            email: email,
            phone: phone,
            message: message
          },
          cache: false,
          success: function() {
            // Success message
            $("#success").html("<div class='alert alert-success'>");
            $("#success > .alert-success")
              .html(
                "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
              )
              .append("</button>");
            $("#success > .alert-success").append(
              "<strong>Your message has been sent. </strong>"
            );
            $("#success > .alert-success").append("</div>");
            //clear all fields
            $("#contactForm").trigger("reset");
          },
          error: function() {
            // Fail message
            $("#success").html("<div class='alert alert-danger'>");
            $("#success > .alert-danger")
              .html(
                "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
              )
              .append("</button>");
            $("#success > .alert-danger").append(
              $("<strong>").text(
                "Sorry " +
                  firstName +
                  ", it seems that my mail server is not responding. Please try again later!"
              )
            );
            $("#success > .alert-danger").append("</div>");
            //clear all fields
            $("#contactForm").trigger("reset");
          },
          complete: function() {
            setTimeout(function() {
              $this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
            }, 1000);
          }
        });
    },
    filter: function() {
      return $(this).is(":visible");
    }
  }),
    $('a[data-toggle="tab"]').click(function(t) {
      t.preventDefault(), $(this).tab("show");
    });
}),
  $("#name").focus(function() {
    $("#success").html("");
  });
