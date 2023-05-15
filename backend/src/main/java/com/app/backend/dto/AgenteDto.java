package com.app.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AgenteDto {

    private Long agent_id;

    @NotBlank(message = "Agent name is required")
    @Pattern(regexp = "^[a-zA-Z ]*$", message = "Agent name must be alphabetic")
    private String agent_name;

    @NotBlank(message = "Agent details are required")
    private String agent_details;
}
