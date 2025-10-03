package com.vinhnd.ticinema_server.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "movies")
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String poster;
    private LocalDate releaseDate;

    @Column(columnDefinition = "TEXT")
    private String description;

    private Integer duration;
    private String trailer;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
}
